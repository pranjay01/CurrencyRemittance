build: 
	mvn package
	
run: build
	java -jar target/DirectExchange-0.0.1-SNAPSHOT.jar

docker-build: build
	docker build -t directexchange .
	docker images

docker-clean:
	docker stop directexchange
	docker rm directexchange
	docker rmi directexchange

docker-run:
	docker run --name directexchange -td -p 80:8080 directexchange
	docker ps

docker-stop:
	docker stop directexchange
	docker rm directexchange






	
