import React, { Component } from 'react';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { queryReducer } from './app/reducers/query';
import thunkMiddleware from 'redux-thunk';

import { TodosContainer } from './app/components/Todos';

import './App.css';

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
const store = createStore(queryReducer, enhancer);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <TodosContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
