



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

로컬에서 redis-server가 구동중

### node 실행

```shell
$ npm start

> node_redis@1.0.0 start /Users/jace/Workspace/docker/node-redis
> node app.js

Listening 8081 port
```

도커 이미지 생성

```shell
docker build -t jacegem/node-redis:1.0 .
```

```shell
docker run jacegem/node-redis:1.0
```



