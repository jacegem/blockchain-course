# Kubernetes

앱을 만들면 Container로 실행합니다.
이걸 쿠버네티스에서 `pod` 이라고 부릅니다.
각각의 pod는 1개의 IP를 가집니다.
모이면 리플리카셋이 되고,
이것들을 deployment라고 배포합니다.
이런 친구들은 `워커 노드`에서 돌아갑니다

- Master Node : 스케쥴링
- Worker Node : 실제 일을 하는 친구들

쿠버네티스는 마스터를 다 관리해줍니다.
IBM, GCP 등에서 마스터를 알아서 관리해주고 워커만 저희가 보면 됩니다.

## 쿠버네티스의 장점

- 스케쥴링을 잘해줌
- 죽어도 스스로 잘 살려줌
- 확장성
- 로드 밸런싱
- 롤아웃/롤백이 자동으로 진행
- 설정을 관리

## Install kubectl cli

```shell
sudo apt update && sudo apt install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" |sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt update
sudo apt install -y kubectl
```

- kubectl을 설치해야 합니다. (단 처음 설치하면 tab이 안됨)
- `kubectl version` : 쿠버네티스 버전 명시 (처음엔 Client만 나옴)
- `source <(kubectl completion bash)` : 자동완성 가능하도록 설정
- `kubectl completion bash | sudo tee /etc/bash_completion.d/kubectl`: 종료해도 자동완성 가능하도록 설정!

`zsh` 사용하는 경우

```shell
$ source <(kubectl completion zsh)
$ kubectl completion zsh | sudo tee /etc/bash_completion.d/kubectl
```

```shell
$ kubectl version
Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.11", GitCommit:"637c7e288581ee40ab4ca210618a89a555b6e7e9", GitTreeState:"clean", BuildDate:"2018-11-26T14:38:32Z", GoVersion:"go1.9.3", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.11", GitCommit:"637c7e288581ee40ab4ca210618a89a555b6e7e9", GitTreeState:"clean", BuildDate:"2018-11-26T14:25:46Z", GoVersion:"go1.9.3", Compiler:"gc", Platform:"linux/amd64"}

$ kubectl get pods
No resources found.

$ kubectl get pods -nkube-system
NAME                                         READY     STATUS    RESTARTS   AGE
etcd-docker-for-desktop                      1/1       Running   0          1m
kube-apiserver-docker-for-desktop            1/1       Running   0          1m
kube-controller-manager-docker-for-desktop   1/1       Running   0          1m
kube-dns-86f4d74b45-rg8rp                    3/3       Running   0          1m
kube-proxy-hnxgd                             1/1       Running   0          1m
kube-scheduler-docker-for-desktop            1/1       Running   0          38s
```

## Depoying apps into clusters

- bx login : au-syd 선택!
- bx cr region-set : 개인 저장소를 사용하기 위한 명령어. container repository의 약자(cs) ap-south 선택!
- bx cr namespace-list : 이름을 출력!
- export MY_REGISTRY_NAMESPACE=<namespace> : 환경설정 추가
- bx cr login : cat ~/.docker/config.json 을 사용해 로그인
- docker image ls : 현재 로컬에 있는 docker 이미지 출력
- docker image tag hello-world:1 registry.au-syd.bluemix.net/\$MY_REGISTRY_NAMESPACE/hello-world:1 : 같은 Image ID를 가지는 image가 생성됩니다.
- docker image push registry.au-syd.bluemix.net/\$MY_REGISTRY_NAMESPACE/hello-world:1 : 이미지가 IBM 개인 저장소로 push!
- bx cr image-list : 개인 저장소에 있는 image를 출력합니다.

```shell
docker image tag hello-world:2 registry.au-syd.bluemix.net/$MY_REGISTRY_NAMESPACE/hello-world:2
docker image push registry.au-syd.bluemix.net/$MY_REGISTRY_NAMESPAC/hello-world:2
```

hello-world:2 도 올려줍니다.!

- `bx cs clustes` : 명령어가 `cs`로 바뀜 container service
- expoert MY_CLUSTER_NAME=<cluster 이름>
- bx cs workers \$MY_CLUSTER_NAME : worker들의 설정을 보여줍니다.
- bx cs cluster-config \$MY_CLUSTER_NAME : export KUBECONFIG ~를 그대로 복사해서 터미널에서 실행! 해당 config에 쿠버네티스 정보가 나타납니다.
- kubectl version : 이제 Server도 출력됩니다.
- kubectl version --short: 짧게 version 출력

## Worker 올리는 부분

- kubectl run hello-world-deployment --image-registry.au-syd.bluemix.net/\$MY_REGISTRY_NAMESPACE/hello-world:1 : 해당 image를 가지고 와서 쿠버네티스 실행!
- kubectl get pod : pod 생성되었는지 확인
- kubectl get deployment: 방금 deploy한 정보가 나옴. deployment 뒤에 이름을 붙여서 볼 수도 있음
- kubectl get deployment hello-world-deployment -o yaml: -o yaml을 사용해 더 상세한 데이터를 보여줌

  - replicas: 1개로 되어 있음
  - rollingUpdate: deployment 정책! 1개씩만 올리고 내림

- kubectl describe deployment hello-world-deployment : 현재 상태를 보여줌
- kubectl get replicaset: replicaset이 나타남
- kubectl get replicaset -o yaml: 특정 replicaset 정보를 가지고 옵니다 (여기서 pod 관리 정책이 있음)
- kubectl get pod: pod이 생김
- kubectl get pod -o yaml: pod은 특정 ip를 가지고 있음. hostIP도 나타나며 다른 정보들도 포함

## pod 외부에서 확인하고 싶을 경우

외부에서 확인하기 위해선 cluster ip, node port 열어주기 등의 방법이 필요합니다. 여기선 node port를 열어보겠습니다.

- kubectl expose deployment/hello-world-deployment --type=NodePort --port=8080 --name=hello-world-service --target-port=8080
- kubectl describe service hello-world-service: 해당 서비스 설명 출력. 8080:30384/TCP가 되었습니다.
- bx cs workers \$MY_CLUSTER_NAME : 해당 IP를 확인한 후, nodePORT 를 연결하면 접속이 됨
- kubectl edit deployment hello-world-deployment : deployment를 수정합니다. replicas의 수를 수정할 수 있습니다.
- kubectl scale --replicas=5 deployment hello-world-deployment: replicas 개수를 조절할 수 있습니다.
- kubectl get pod: 하면 개수가 증가됨을 볼 수 있음
- kubectl rollout status deployment hello-world-deployment: rollout 상태를 보여줌
- kubectl describe replicaset: 4개 추가됨을 볼 수 있음
- watch -n 1 curl http://워커아이피:노트포트/ : 1초마다 해당 내용을 가져오는데, 어떤 팟을 쓰는지 볼 수 있음

## Version 오류 발생시 대처가 어떻게 되는지?

- export MY_REGISTRY_NAMESPACE=<ID>
- kubectl set image deployment hello-world-deployment hello-world-deployment-registry.au-syd.bluemix.net/\$MY_REGISTRY_NAMESPACE/hello-world:3 : 아직 3을 안 만들었지만 생성됨
- kubectl rollout status deployment hello-world-deployment: 2개가 업데이트 되고 진행이 안됩니다.
- kubectl descibe pod : 상태가 다릅니다.
- kubectl get pod : 이미지를 PULL하다 에러가 뜸!
- kubectl rollout undo deployment hello-world-deployment: 롤백!
- kubectl get pod: 멀쩡한 것을 볼 수 있음

## Reference

- [서비큐라님 블로그](https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html)
도커 튜토리얼 : 깐 김에 배포까지
Docker에서 apt-get update가 실패할 때
Docker 컨테이너 이미지 생성
Image doe not contain ‘sudo’
IBM developerWorks 밋업, 도커와 쿠버네티스, 두 마리 토끼를 잡자!
IBM Document

- https://zzsza.github.io/development/2018/04/17/docker-kubernetes/
- https://velog.io/@ikhoon/Minikube-%EC%84%A4%EC%B9%98-%EB%B0%8F-Kubenetes-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0
- http://docker-dwmeetup.mybluemix.net/k8s1.html
