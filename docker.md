
### 파일 작성

docker-compose.yml

```shell
version: "3"
services:
    echo:
        image: jacegem/echo:latest
        ports:
          - 9090:8000
```

```shell
root@server:~/docker# docker-compose up
ERROR: yaml.scanner.ScannerError: while scanning for the next token
found character '\t' that cannot start any token
  in "./docker-compose.yml", line 3, column 1
```
탭을 사용하면 에러 발생, 스페이스로 변경


```shell
root@server:~/docker# docker-compose up
Starting docker_echo_1 ... done
Attaching to docker_echo_1
echo_1  | 2019/06/04 05:57:23 start server
```

이미지가 없으면 가져와서 실행한다.


### 실행 확인

```shell
root@server:~/docker# docker container ls
CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                    NAMES
ad2ba2b8544a        jacegem/echo:latest   "go run /echo/main.go"   25 minutes ago      Up 25 minutes       0.0.0.0:9090->8000/tcp   docker_echo_1
```


### build

docker-compose.yml 파일 수정

```shell
version: "3"
services:
    echo:
        build: .
        ports:
          - 9090:8000
```

docker-compose up

```shell
root@server:~/docker# docker-compose up
Building echo
Step 1/4 : FROM golang:1.9
 ---> ef89ef5c42a9
Step 2/4 : RUN mkdir /echo
 ---> Using cache
 ---> fe62aaf8640d
Step 3/4 : COPY main.go /echo
 ---> 695eda37f336
Removing intermediate container 32a3d4003e31
Step 4/4 : CMD go run /echo/main.go
 ---> Running in a4d3282b6700
 ---> 2b0482791c72
Removing intermediate container a4d3282b6700
Successfully built 2b0482791c72
Successfully tagged docker_echo:latest
WARNING: Image for service echo was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Recreating docker_echo_1 ... done
Attaching to docker_echo_1
echo_1  | 2019/06/04 06:24:44 start server
```



여러개 실행

```shell
version: "3"
services:
    echo:
        build: .
        ports:
          - 9090:8000
    echo2:
        build: .
        ports:
          - 9091:8000
```

### detach mode

```shell
root@server:~/docker# docker-compose up -d
Starting docker_echo_1  ... done
Starting docker_echo2_1 ... done
```


### scale

docker-compose up --scale echo=10

```shell
version: "3"
services:
    echo:
        build: .
        ports:
          - 8000
```

앞에 `:` 콜론이 없어야 함