# [Docker] node, redis 실행 및 연결

tags: docker, docker-compose, node, npm, redis, redis-server

## node

### node 프로젝트 생성

```shell
npm init
```

해당 폴더에 `packages.json` 파일이 생성됩니다.

### node 패키지 설치

```shell
npm install --save express
npm install --save redis
```

### app.js 작성

```javascript
const express = require("express")
const redis = require("redis")

const app = express()

const client = redis.createClient()
client.set("visits", 0)

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of visit is " + visits)
    client.set("visits", parseInt(visits) + 1)
  })
})

app.listen(8081, () => {
  console.log("Listening 8081 port")
})
```

redis-server 에 접속하고 express 서버를 실행하는 코드입니다.

## 로컬 테스트

### redis 설치

```shell
brew install redis
```

### redis 실행

```shell
redis-server
```

### redis 실행 확인

```shell
$ redis-cliredis-cli

127.0.0.1:6379> set test 1234
OK
127.0.0.1:6379> get test
"1234"
```

로컬에서 redis-server가 구동중입니다. 

### node 실행

packages.json 파일을 수정합니다. scripts 에  `start` 부분을 추가합니다.

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
```

npm 을 실행합니다.

```shell
$ npm start

> node_redis@1.0.0 start /Users/jace/Workspace/docker/node-redis
> node app.js

Listening 8081 port
```

브라우저에서 `localhost:8081`로 접속하여 확인합니다. 

![](https://content.screencast.com/users/beneapp/folders/Snagit/media/d69392bb-e6a6-432c-950d-b9db0c719d06/2019-06-12_11-40-56.png)



## Dockerfile 생성

프로젝트폴더에 Dockerfile 을 생성합니다. 

```shell
FROM node:10-alpine

WORKDIR "./app"

COPY ./package.json .

RUN npm install

COPY ./ ./

CMD ["npm", "start"]
```

node_modules를 제외하기 위해 dockerignore 파일을 추가합니다.

```shell
**/node_modules
```

### docker-compose.yml 파일 생성

```shell
version: "2"
services:
  redis-server:
    image: "redis"
  node-app:
    build: .
    ports:
      - "8081:8081"
```

### app.js 파일 수정

```javascript
 // const client = redis.createClient()
 const client = redis.createClient({
   host: "redis-server",
   port: 6379,
 })
```

`redis-server` 이름은 docker-compose.yml 에 작성되어 있습니다.

### docker-compose 실행

```
$ sudo docker-compose up --build
```



동일하게 브라우저에서 `localhost:8081`로 접속하여 확인합니다. 

![](https://content.screencast.com/users/beneapp/folders/Snagit/media/d69392bb-e6a6-432c-950d-b9db0c719d06/2019-06-12_11-40-56.png)



## 파일

- [package.json]
- [app.js]
- [Dockerfile]
- [docker-compose.yml]
- [.dockerignore]





---





도커 이미지 생성

```
 docker build -t jacegem/node-redis:1.0 .
 docker run jacegem/node-redis:1.0
 $ docker run redis
 $ docker ps
 CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
 a3feff534381        redis               "docker-entrypoint.s…"   23 seconds ago      Up 22 seconds       6379/tcp            serene_cocks
 
 $ docker exec -it a3 redis-cli
 127.0.0.1:6379>
 $ docker inspect a3
 
 [
     {
         "Id": "a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b",
         "Created": "2019-06-12T02:05:48.2415448Z",
         "Path": "docker-entrypoint.sh",
         "Args": [
             "redis-server"
         ],
         "State": {
             "Status": "running",
             "Running": true,
             "Paused": false,
             "Restarting": false,
             "OOMKilled": false,
             "Dead": false,
             "Pid": 2950,
             "ExitCode": 0,
             "Error": "",
             "StartedAt": "2019-06-12T02:05:48.9919681Z",
             "FinishedAt": "0001-01-01T00:00:00Z"
         },
         "Image": "sha256:3c41ce05add98e89ff5ef31ec8cf2f5866e2b82fbe1eae057201f7c6f884f23d",
         "ResolvConfPath": "/var/lib/docker/containers/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b/resolv.conf",
         "HostnamePath": "/var/lib/docker/containers/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b/hostname",
         "HostsPath": "/var/lib/docker/containers/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b/hosts",
         "LogPath": "/var/lib/docker/containers/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b-json.log",
         "Name": "/serene_cocks",
         "RestartCount": 0,
         "Driver": "overlay2",
         "Platform": "linux",
         "MountLabel": "",
         "ProcessLabel": "",
         "AppArmorProfile": "",
         "ExecIDs": null,
         "HostConfig": {
             "Binds": null,
             "ContainerIDFile": "",
             "LogConfig": {
                 "Type": "json-file",
                 "Config": {}
             },
             "NetworkMode": "default",
             "PortBindings": {},
             "RestartPolicy": {
                 "Name": "no",
                 "MaximumRetryCount": 0
             },
             "AutoRemove": false,
             "VolumeDriver": "",
             "VolumesFrom": null,
             "CapAdd": null,
             "CapDrop": null,
             "Dns": [],
             "DnsOptions": [],
             "DnsSearch": [],
             "ExtraHosts": null,
             "GroupAdd": null,
             "IpcMode": "shareable",
             "Cgroup": "",
             "Links": null,
             "OomScoreAdj": 0,
             "PidMode": "",
             "Privileged": false,
             "PublishAllPorts": false,
             "ReadonlyRootfs": false,
             "SecurityOpt": null,
             "UTSMode": "",
             "UsernsMode": "",
             "ShmSize": 67108864,
             "Runtime": "runc",
             "ConsoleSize": [
                 0,
                 0
             ],
             "Isolation": "",
             "CpuShares": 0,
             "Memory": 0,
             "NanoCpus": 0,
             "CgroupParent": "",
             "BlkioWeight": 0,
             "BlkioWeightDevice": [],
             "BlkioDeviceReadBps": null,
             "BlkioDeviceWriteBps": null,
             "BlkioDeviceReadIOps": null,
             "BlkioDeviceWriteIOps": null,
             "CpuPeriod": 0,
             "CpuQuota": 0,
             "CpuRealtimePeriod": 0,
             "CpuRealtimeRuntime": 0,
             "CpusetCpus": "",
             "CpusetMems": "",
             "Devices": [],
             "DeviceCgroupRules": null,
             "DiskQuota": 0,
             "KernelMemory": 0,
             "MemoryReservation": 0,
             "MemorySwap": 0,
             "MemorySwappiness": null,
             "OomKillDisable": false,
             "PidsLimit": 0,
             "Ulimits": null,
             "CpuCount": 0,
             "CpuPercent": 0,
             "IOMaximumIOps": 0,
             "IOMaximumBandwidth": 0,
             "MaskedPaths": [
                 "/proc/asound",
                 "/proc/acpi",
                 "/proc/kcore",
                 "/proc/keys",
                 "/proc/latency_stats",
                 "/proc/timer_list",
                 "/proc/timer_stats",
                 "/proc/sched_debug",
                 "/proc/scsi",
                 "/sys/firmware"
             ],
             "ReadonlyPaths": [
                 "/proc/bus",
                 "/proc/fs",
                 "/proc/irq",
                 "/proc/sys",
                 "/proc/sysrq-trigger"
             ]
         },
         "GraphDriver": {
             "Data": {
                 "LowerDir": "/var/lib/docker/overlay2/adc26fcc0cf6bfd18d70bed924a2a63e0650b2a0534cb557008228fa4289005a-init/diff:/var/lib/docker/overlay2/c6b6210103855938c12a0b0c937c7009035b16fcb93d29ca3a97c5075b6ce8dd/diff:/var/lib/docker/overlay2/74f4eccf14895545b04ac3cc6803ada0c3f4ce3f2f25a8a02f227ccb06d54bdb/diff:/var/lib/docker/overlay2/6f2d9a67687410c25b0dcb969a6af50488c296ed0c3c52fd998dbb5ea78fe792/diff:/var/lib/docker/overlay2/683d9a68cdd0af490eb6e94f0b2ce9c591f14b29e070ec23da211068574a647e/diff:/var/lib/docker/overlay2/007fa20319897616b360d6ea039e2bcd0fdeb5cc79e7561d52e71727a529fce6/diff:/var/lib/docker/overlay2/138ee748603d6c798d712c1cdefffc067eed5bfbe8882bce2ee8352344108ebe/diff",
                 "MergedDir": "/var/lib/docker/overlay2/adc26fcc0cf6bfd18d70bed924a2a63e0650b2a0534cb557008228fa4289005a/merged",
                 "UpperDir": "/var/lib/docker/overlay2/adc26fcc0cf6bfd18d70bed924a2a63e0650b2a0534cb557008228fa4289005a/diff",
                 "WorkDir": "/var/lib/docker/overlay2/adc26fcc0cf6bfd18d70bed924a2a63e0650b2a0534cb557008228fa4289005a/work"
             },
             "Name": "overlay2"
         },
         "Mounts": [
             {
                 "Type": "volume",
                 "Name": "d50b5d124381db4c654479cca3347c3d862ad1ef8a93778ee867350ebb5f61c1",
                 "Source": "/var/lib/docker/volumes/d50b5d124381db4c654479cca3347c3d862ad1ef8a93778ee867350ebb5f61c1/_data",
                 "Destination": "/data",
                 "Driver": "local",
                 "Mode": "",
                 "RW": true,
                 "Propagation": ""
             }
         ],
         "Config": {
             "Hostname": "a3feff534381",
             "Domainname": "",
             "User": "",
             "AttachStdin": false,
             "AttachStdout": true,
             "AttachStderr": true,
             "ExposedPorts": {
                 "6379/tcp": {}
             },
             "Tty": false,
             "OpenStdin": false,
             "StdinOnce": false,
             "Env": [
                 "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                 "GOSU_VERSION=1.10",
                 "REDIS_VERSION=5.0.5",
                 "REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-5.0.5.tar.gz",
                 "REDIS_DOWNLOAD_SHA=2139009799d21d8ff94fc40b7f36ac46699b9e1254086299f8d3b223ca54a375"
             ],
             "Cmd": [
                 "redis-server"
             ],
             "ArgsEscaped": true,
             "Image": "redis",
             "Volumes": {
                 "/data": {}
             },
             "WorkingDir": "/data",
             "Entrypoint": [
                 "docker-entrypoint.sh"
             ],
             "OnBuild": null,
             "Labels": {}
         },
         "NetworkSettings": {
             "Bridge": "",
             "SandboxID": "e1cc70b9d9e2b69e80496f414b47abfab3e4f22281075ba61b9d0ba25b0457d1",
             "HairpinMode": false,
             "LinkLocalIPv6Address": "",
             "LinkLocalIPv6PrefixLen": 0,
             "Ports": {
                 "6379/tcp": null
             },
             "SandboxKey": "/var/run/docker/netns/e1cc70b9d9e2",
             "SecondaryIPAddresses": null,
             "SecondaryIPv6Addresses": null,
             "EndpointID": "704c776fd16d2da1f5f09702731e491c6fdbdadf554bd243823e55049471a859",
             "Gateway": "172.17.0.1",
             "GlobalIPv6Address": "",
             "GlobalIPv6PrefixLen": 0,
             "IPAddress": "172.17.0.2",
             "IPPrefixLen": 16,
             "IPv6Gateway": "",
             "MacAddress": "02:42:ac:11:00:02",
             "Networks": {
                 "bridge": {
                     "IPAMConfig": null,
                     "Links": null,
                     "Aliases": null,
                     "NetworkID": "bda855987d44f190469038f64a52771ec8d25e54bba8ddd83c5825050aa9b5dd",
                     "EndpointID": "704c776fd16d2da1f5f09702731e491c6fdbdadf554bd243823e55049471a859",
                     "Gateway": "172.17.0.1",
                     "IPAddress": "172.17.0.2",
                     "IPPrefixLen": 16,
                     "IPv6Gateway": "",
                     "GlobalIPv6Address": "",
                     "GlobalIPv6PrefixLen": 0,
                     "MacAddress": "02:42:ac:11:00:02",
                     "DriverOpts": null
                 }
             }
         }
     }
 ]
 docker rm $(docker ps -aq)
 version: '2'
 services:
   redis-server:
     image: 'redis'
   node-app:
     build: .
     ports:
       - "8081:8081"
 
 $ sudo docker-compose up --build
 Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
 // const client = redis.createClient()
 const client = redis.createClient({
   host: "redis-server",
   port: 6379,
 })
```



### docker-compose 실행

```
$ sudo docker-compose up --build
```

노드에서 어떻게 redis에 접근할 수 있는가?

```
Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
```

이름으로 접근한다.

```javascript
// const client = redis.createClient()
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
})
```

해당 이름은 docker-compose.yml 에 작성되어 있음.





도커 이미지 생성

```shell
docker build -t jacegem/node-redis:1.0 .
```

```shell
docker run jacegem/node-redis:1.0
```

```shell
$ docker run redis
```

```shell
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
a3feff534381        redis               "docker-entrypoint.s…"   23 seconds ago      Up 22 seconds       6379/tcp            serene_cocks

$ docker exec -it a3 redis-cli
127.0.0.1:6379>
```

```shell
$ docker inspect a3

[
    {
        "Id": "a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b",
        "Created": "2019-06-12T02:05:48.2415448Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "redis-server"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 2950,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2019-06-12T02:05:48.9919681Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:3c41ce05add98e89ff5ef31ec8cf2f5866e2b82fbe1eae057201f7c6f884f23d",
        "ResolvConfPath": "/var/lib/docker/containers/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b/hostname",
        "HostsPath": "/var/lib/docker/containers/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b/hosts",
        "LogPath": "/var/lib/docker/containers/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b/a3feff534381a5bbd15b229decf40f0f9750dcc70570d2bc5219945ad415202b-json.log",
        "Name": "/serene_cocks",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "shareable",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DiskQuota": 0,
            "KernelMemory": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": 0,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/adc26fcc0cf6bfd18d70bed924a2a63e0650b2a0534cb557008228fa4289005a-init/diff:/var/lib/docker/overlay2/c6b6210103855938c12a0b0c937c7009035b16fcb93d29ca3a97c5075b6ce8dd/diff:/var/lib/docker/overlay2/74f4eccf14895545b04ac3cc6803ada0c3f4ce3f2f25a8a02f227ccb06d54bdb/diff:/var/lib/docker/overlay2/6f2d9a67687410c25b0dcb969a6af50488c296ed0c3c52fd998dbb5ea78fe792/diff:/var/lib/docker/overlay2/683d9a68cdd0af490eb6e94f0b2ce9c591f14b29e070ec23da211068574a647e/diff:/var/lib/docker/overlay2/007fa20319897616b360d6ea039e2bcd0fdeb5cc79e7561d52e71727a529fce6/diff:/var/lib/docker/overlay2/138ee748603d6c798d712c1cdefffc067eed5bfbe8882bce2ee8352344108ebe/diff",
                "MergedDir": "/var/lib/docker/overlay2/adc26fcc0cf6bfd18d70bed924a2a63e0650b2a0534cb557008228fa4289005a/merged",
                "UpperDir": "/var/lib/docker/overlay2/adc26fcc0cf6bfd18d70bed924a2a63e0650b2a0534cb557008228fa4289005a/diff",
                "WorkDir": "/var/lib/docker/overlay2/adc26fcc0cf6bfd18d70bed924a2a63e0650b2a0534cb557008228fa4289005a/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [
            {
                "Type": "volume",
                "Name": "d50b5d124381db4c654479cca3347c3d862ad1ef8a93778ee867350ebb5f61c1",
                "Source": "/var/lib/docker/volumes/d50b5d124381db4c654479cca3347c3d862ad1ef8a93778ee867350ebb5f61c1/_data",
                "Destination": "/data",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "a3feff534381",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": true,
            "AttachStderr": true,
            "ExposedPorts": {
                "6379/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "GOSU_VERSION=1.10",
                "REDIS_VERSION=5.0.5",
                "REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-5.0.5.tar.gz",
                "REDIS_DOWNLOAD_SHA=2139009799d21d8ff94fc40b7f36ac46699b9e1254086299f8d3b223ca54a375"
            ],
            "Cmd": [
                "redis-server"
            ],
            "ArgsEscaped": true,
            "Image": "redis",
            "Volumes": {
                "/data": {}
            },
            "WorkingDir": "/data",
            "Entrypoint": [
                "docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "e1cc70b9d9e2b69e80496f414b47abfab3e4f22281075ba61b9d0ba25b0457d1",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "6379/tcp": null
            },
            "SandboxKey": "/var/run/docker/netns/e1cc70b9d9e2",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "704c776fd16d2da1f5f09702731e491c6fdbdadf554bd243823e55049471a859",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "bda855987d44f190469038f64a52771ec8d25e54bba8ddd83c5825050aa9b5dd",
                    "EndpointID": "704c776fd16d2da1f5f09702731e491c6fdbdadf554bd243823e55049471a859",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]
```

컨테이너 삭제

```shell
docker rm $(docker ps -aq)
```

docker-compose.yml

```shell
version: '2'
services:
  redis-server:
    image: 'redis'
  node-app:
    build: .
    ports:
      - "8081:8081"

```

### docker-compose 실행

```
$ sudo docker-compose up --build
```

노드에서 어떻게 redis에 접근할 수 있는가?

```
Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
```

이름으로 접근한다.

```javascript
// const client = redis.createClient()
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
})
```

해당 이름은 docker-compose.yml 에 작성되어 있음.

