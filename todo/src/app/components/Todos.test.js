import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { stub, sandbox } from 'sinon';
import * as actionQuery from '../actions/query';

import Todos from './Todos';

let boxed;
let getTodosStub;

beforeEach(() => {
  boxed = sandbox.create();
  getTodosStub = boxed.stub(actionQuery, 'getTodos');
});

afterEach(() => {
  boxed.restore();
});

it('renders an empty todos list', () => {
  let dispatchStub = stub();
  const component = renderer.create(
    <Todos
      dispatch={dispatchStub}
      store={{
        fetchInProgress: false,
        allTodos: [],
      }}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(dispatchStub.calledOnce).toBeTruthy();
  expect(getTodosStub.calledOnce).toBeTruthy();
});

it('renders an existing todos list', () => {
  let dispatchStub = stub();
  const component = renderer.create(
    <Todos
      dispatch={dispatchStub}
      store={{
        fetchInProgress: false,
        allTodos: [{ action: 'foo', completed: false, id: 123 }],
      }}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(dispatchStub.calledOnce).toBeTruthy();
  expect(getTodosStub.calledOnce).toBeTruthy();
});
