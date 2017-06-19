import { addTodo, updateCompleted, deleteTodo } from '../actions/query';

const initialState = {
  fetching: false,
  allTodos: [],
};

export const queryReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'STARTING_REQUEST':
    return {
      ...state,
      fetching: true,
    };
  case 'FINISHED_REQUEST':
    return {
      ...state,
      fetching: false,
      allTodos: action.response.data && action.response.data.allTodos,
    };
  case 'ADD': {
    const newTodolist = state.allTodos.slice(0);
    newTodolist.push({
      id: newTodolist.length + 1,
      completed: false,
      action: action.action,
      result: addTodo(action.action),
    });
    return {
      ...state,
      allTodos: newTodolist,
    };
  }
  case 'TOGGLE_COMPLETED':
    return {
      ...state,
      allTodos: state.allTodos.map(todo => {
        if (todo.id !== action.id) return todo;

        const completed = !todo.completed;
        return {
          ...todo,
          completed: completed,
          result: updateCompleted(todo.id, completed),
        };
      }),
    };
  case 'DELETE': {
    let newTodolist = state.allTodos.slice(0);
    newTodolist = newTodolist.filter(todo => {
      const shouldKeepThisOne = todo.id !== action.id;
      if (!shouldKeepThisOne) deleteTodo(todo.id);
      return shouldKeepThisOne;
    });
    return {
      ...state,
      allTodos: newTodolist,
    };
  }
    // case 'EDIT':
  default:
    return state;
  }
};
