# yu-todo

Yu Todo is a to-do list application written using:

* Docker
* Node
* React
* Redux
* GraphQL
* PostgreSQL

## Starting the application

Assuming that you have an active internet connection and the latest version of [`Docker`](https://www.docker.com) installed and running.

Running the following in this directory:

`make start`

## Viewing the application

Once the dependencies have been downloaded and application has reported that the PostgreSQL, GraphQL and web app services are running, the application can be viewed by going to:

**http://localhost:3000**

For debugging the GraphQL service can be found at: http://localhost:4000/graphql and PostgreSQL service will be available on port: `5432`.

## Running tests

Tests are automatically run when using `make start`, however they can be run manually via: `make dependencies test`.

## Stopping and cleaning up the application

`make stop`
