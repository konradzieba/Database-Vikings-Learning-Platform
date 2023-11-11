.PHONY: build-api run-api build-db run-db

build-api:
	docker-compose -f api-docker-compose.yml build

run-api:
	docker-compose -f api-docker-compose.yml up

build-db:
	docker-compose -f postgres-docker-compose.yml build

run-db:
	docker-compose -f postgres-docker-compose.yml up