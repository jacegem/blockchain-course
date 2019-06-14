# Docker Apache





```javascript
FROM ubuntu:16.04

MAINTAINER hsbae

LABEL "purpose"="practice"

WORKDIR /var/www/html

RUN apt-get update
RUN apt-get install apache2 -y
RUN ["/bin/bash", "-c", "echo hello >> test2.html"]

EXPOSE 80

CMD apachectl -DFOREGROUND
```



빌드 및 실행

sudo docker build -t jacegem/apache_server:1.0 .

sudo docker run jacegem/apache_server:1.0





docker stop $(docker ps -aq)