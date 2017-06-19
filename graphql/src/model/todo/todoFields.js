const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');
const {
  fetchTodo,
  fetchAllTodos,
  createTodo,
  updateTodoCompleted,
  updateTodo,
  deleteTodo,
} = require('../../lib/db');

const Todo = {
  name: 'Todo',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'The todos id',
    },
    completed: {
      type: GraphQLBoolean,
      description: 'Has this todo item been completed',
    },
    action: {
      type: GraphQLString,
      description: 'The todos action',
    },
  },
};
const TodoType = new GraphQLObjectType(Todo);

const TodoSchemaFields = {
  todo: {
    type: TodoType,
    description: 'Request a todo by id',
    args: {
      id: Todo.fields.id,
    },
    resolve: (source, args) => fetchTodo(args),
  },
  allTodos: {
    type: new GraphQLList(TodoType),
    description: 'Request all todos',
    resolve: fetchAllTodos,
  },
};

const TodoSchemaMutationFields = {
  createTodo: {
    type: TodoType,
    description: 'Create a new todo item returns the its new id and action',
    args: {
      action: Todo.fields.action,
    },
    resolve: (source, args) =>
      createTodo(args).then(data => ({
        id: data['id'],
        completed: false,
        action: args.action,
      })),
  },
  updateTodo: {
    type: GraphQLBoolean,
    description:
      'Sets a todo items action (returns true if it was successfully updated)',
    args: {
      id: Todo.fields.id,
      action: Todo.fields.action,
    },
    resolve: (source, args) =>
      updateTodo(args).then(() => true).catch(() => false),
  },
  updateCompleted: {
    type: GraphQLBoolean,
    description:
      'Sets a todo items completed status (returns true if it was successfully updated)',
    args: {
      id: Todo.fields.id,
      completed: Todo.fields.completed,
    },
    resolve: (source, args) =>
      updateTodoCompleted(args).then(() => true).catch(() => false),
  },
  deleteTodo: {
    type: GraphQLBoolean,
    description:
      'Delete a todo item (returns true if it was successfully updated)',
    args: {
      id: Todo.fields.id,
    },
    resolve: (source, args) =>
      deleteTodo(args).then(() => true).catch(() => false),
  },
};

module.exports = {
  TodoSchemaFields,
  TodoSchemaMutationFields,
};
