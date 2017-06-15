.PHONY: start
start:
	make dependencies test run

.PHONY: dependencies
dependencies:
	docker-compose run --rm todo npm install
	docker-compose run --rm graphql npm install

.PHONY: test
test:
	docker-compose run --rm todo npm test -- --coverage
	docker-compose run --rm graphql npm test

.PHONY: run
run:
	docker-compose up

.PHONY: stop
stop:
	-docker-compose kill
	-docker-compose rm -f
