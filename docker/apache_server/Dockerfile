FROM ubuntu:16.04

LABEL "author"="jace"
LABEL "purpose"="practice"

WORKDIR /var/www/html

RUN apt-get update
RUN apt-get install apache2 -y
RUN ["/bin/bash", "-c", "echo hello >> test2.html"]

EXPOSE 80

CMD apachectl -DFOREGROUND