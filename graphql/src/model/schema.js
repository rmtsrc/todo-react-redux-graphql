const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { TodoSchemaFields, TodoSchemaMutationFields } = require('./todo/todoFields');

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: Object.assign(TodoSchemaFields),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: Object.assign(TodoSchemaMutationFields),
  }),
});

module.exports = {
  Schema,
};
