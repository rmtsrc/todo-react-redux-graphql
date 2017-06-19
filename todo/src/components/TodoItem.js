import React, { Component } from 'react';

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
        {action}{' '}
        <button onClick={() => dispatch({ type: 'DELETE', id })}>
          <span role="img" aria-label="Delete">❌</span>
        </button>
      </p>
    );
  }
}
