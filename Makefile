include .env

IMAGE_NAME=snm-api
CONTAINER_NAME=snm-api

build:
	docker build --build-arg WEB_API_PORT=${WEB_API_PORT} -t $(IMAGE_NAME) .

run:
	docker run --name $(CONTAINER_NAME) --net=host -d $(IMAGE_NAME)

start:
	docker start $(IMAGE_NAME)

stop:
	docker stop $(IMAGE_NAME)

clean:
	docker container rm $(IMAGE_NAME)
