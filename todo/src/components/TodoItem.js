import React, { Component } from 'react';

const onDoubleClickTodo = (id, action, dispatch) => {
  const updateTodo = prompt('Update todo item:', action);
  if (updateTodo) {
    dispatch({ type: 'EDIT', id, action: updateTodo });
  }
};

export default class TodoItem extends Component {
  render () {
    const { id, checked, action, dispatch } = this.props;
    return (
      <p>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => dispatch({ type: 'TOGGLE_COMPLETED', id })}
        />{' '}
        <span
          onDoubleClick={() => {
            onDoubleClickTodo(id, action, dispatch);
            window.getSelection().removeAllRanges();
          }}
        >
          {checked ? <strike>{action}</strike> : action}{' '}
        </span>
        <button onClick={() => dispatch({ type: 'DELETE', id })}>
          <span role="img" aria-label="Delete">❌</span>
        </button>
      </p>
    );
  }
}
