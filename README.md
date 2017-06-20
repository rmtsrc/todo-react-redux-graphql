# Todo

Todo is a to-do list application written using and tested:

* [Docker](https://www.docker.com)
* [Node](https://nodejs.org)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/docs/introduction/)
* [Jest](https://facebook.github.io/jest/)
* [GraphQL](http://graphql.org/learn/)
* [PostgreSQL](https://www.postgresql.org/)

## Starting the application

Assuming that you have an active internet connection and the latest version of [`Docker`](https://www.docker.com) installed and running.

Running the following in this directory:

`make start`

Once you see: `Compiled successfully!` in the console the you can move on to the next step.

## Viewing the application

Once the dependencies have been downloaded and application has reported that the PostgreSQL, GraphQL and web app services are running, the application can be viewed by going to:

**http://localhost:3000**

For debugging the GraphQL service can be found at: http://localhost:4000/graphql and PostgreSQL service will be available on port: `5432`.

Here are a few sample GraphQL queries to try out:

```sql
mutation {
  createTodo(action: "hello world")
}

query {
  allTodos {
    id,
    action,
    completed
  }
}

mutation {
  updateCompleted(id: 1, completed: true)
}
```

## Running tests

Tests are automatically run when using `make start`, however they can be run manually via: `make dependencies test`.

## Stopping and cleaning up the application

`make stop`
