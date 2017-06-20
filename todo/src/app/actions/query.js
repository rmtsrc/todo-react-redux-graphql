const fetch = require('isomorphic-fetch');

const startingRequest = () => {
  return {
    type: 'STARTING_REQUEST',
  };
};

const finishedRequest = response => {
  return {
    type: 'FINISHED_REQUEST',
    response: response,
  };
};

const request = payload =>
  fetch('//localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: payload,
  }).then(res => res.json());

const getGraph = payload => {
  return dispatch => {
    dispatch(startingRequest());
    request(payload).then(json => dispatch(finishedRequest(json)));
  };
};

const todoFields = `{
  id,
  action,
  completed
}`;

export const getTodos = () => getGraph(`{ allTodos ${todoFields} }`);

const mutate = payload => request(`mutation { ${payload} }`);

export const addTodo = action => {
  return dispatch => {
    mutate(`createTodo(action:"${action}") ${todoFields}`).then(res => {
      const { id, action } = res.data.createTodo;
      dispatch({
        type: 'ADD',
        id,
        action,
      });
    });
  };
};

export const updateTodo = (id, action) =>
  mutate(`updateTodo(id: ${id}, action: "${action}")`);

export const updateCompleted = (id, completed) =>
  mutate(`updateCompleted(id: ${id}, completed: ${completed})`);

export const deleteTodo = id => mutate(`deleteTodo(id: ${id})`);
