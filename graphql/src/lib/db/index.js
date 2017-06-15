const pgPromise = require('pg-promise')();

const pgOptions = {
  host: 'postgres',
  database: 'postgres',
  user: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
};
const db = pgPromise(pgOptions);

const todoTable = 'todo';

const handleError = error => {
  console.log(error);
  pgPromise.end();
  return {};
};

/**
 * Ideally this would only done once when provision/setting up the stack
 * But for convince and to save writing a provisioning script just check and make the DB
 * @return {void}
 */
db
  .none(
    `CREATE TABLE IF NOT EXISTS ${todoTable}(id BIGSERIAL PRIMARY KEY, data JSONB)`
  )
  .catch(handleError);

const fetchOne = (docType, args) =>
  db.one(`SELECT * FROM ${docType} WHERE id=${args.id}`).catch(handleError);

const fetchAll = docType =>
  db
    .any(
      `SELECT
        id,
        data->'completed' AS completed,
        data->'action' AS action
      FROM ${docType} ORDER BY id`
    )
    .catch(handleError);

const fetchTodo = args => fetchOne(todoTable, args);

const fetchAllTodos = () => fetchAll(todoTable);

const createTodo = args =>
  db.one(`INSERT INTO ${todoTable} (data) VALUES ($1) RETURNING id`, [
    { completed: false, action: args.action },
  ]);

const updateCompleted = args =>
  db.none(`UPDATE ${todoTable} SET data = data || ($1) WHERE id=($2)`, [
    { completed: args.completed },
    args.id,
  ]);

module.exports = {
  fetchTodo,
  fetchAllTodos,
  createTodo,
  updateCompleted,
};
