import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../actions/query';

import TodoItem from './TodoItem';

class Todos extends Component {
  componentDidMount () {
    this.props.dispatch(getTodos());
  }

  render () {
    const dispatch = this.props.dispatch;
    let queryText;

    const { fetchInProgress, allTodos } = this.props.store;

    const todoItems = allTodos.map(
      todo =>
        todo &&
        <TodoItem
          key={todo.id}
          id={todo.id}
          checked={todo.completed}
          action={todo.action}
          dispatch={dispatch}
        />
    );

    return (
      <div>
        {fetchInProgress ? <p>Fetch in progress...</p> : null}
        {todoItems}
        <form
          onSubmit={e => {
            e.preventDefault();
            dispatch({ type: 'ADD', action: queryText.value });
            queryText.value = '';
          }}
        >
          <input
            ref={node => {
              queryText = node;
            }}
          />{' '}
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state,
  };
};
export const TodosContainer = connect(mapStateToProps)(Todos);
