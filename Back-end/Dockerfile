FROM openjdk:8
EXPOSE 8080 8080
ADD ./target/DirectExchange-0.0.1-SNAPSHOT.jar /srv/DirectExchange-0.0.1-SNAPSHOT.jar
RUN apt update
RUN apt install vim -y
WORKDIR /srv
CMD java -jar /srv/DirectExchange-0.0.1-SNAPSHOT.jar


