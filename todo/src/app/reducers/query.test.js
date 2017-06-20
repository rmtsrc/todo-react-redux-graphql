import { sandbox } from 'sinon';
import * as actionQuery from '../actions/query';
import { queryReducer } from './query';

let boxed;
let updateCompletedStub;
let updateTodoStub;
let deleteTodoStub;

beforeEach(() => {
  boxed = sandbox.create();
  updateCompletedStub = boxed.stub(actionQuery, 'updateCompleted');
  updateTodoStub = boxed.stub(actionQuery, 'updateTodo');
  deleteTodoStub = boxed.stub(actionQuery, 'deleteTodo');
});

afterEach(() => {
  boxed.restore();
});

it('returns the initial state if there is no action', () => {
  expect(queryReducer(undefined, {})).toEqual({
    allTodos: [],
    fetching: false,
  });
});

it('sets fetching state when starting request', () => {
  expect(queryReducer({}, { type: 'STARTING_REQUEST' }).fetching).toBeTruthy();
});

it('sets state when finishing a request', () => {
  const actual = queryReducer(undefined, {
    type: 'FINISHED_REQUEST',
    response: { data: { allTodos: 'hello world' } },
  });

  expect(actual.fetching).toBeFalsy();
  expect(actual.allTodos).toEqual('hello world');
});

it('adds a new todo item', () => {
  const actual = queryReducer(undefined, {
    type: 'ADD',
    id: 123,
    action: 'foo',
  });

  expect(actual.fetching).toBeFalsy();
  expect(actual.allTodos).toEqual([
    { action: 'foo', completed: false, id: 123 },
  ]);
});

it('toggles todo to complete', () => {
  const actual = queryReducer(
    {
      allTodos: [
        { action: 'foo', completed: false, id: 123 },
        { action: 'foo', completed: false, id: 1234 },
      ],
    },
    {
      type: 'TOGGLE_COMPLETED',
      id: 123,
    }
  );

  expect(actual.allTodos[0].completed).toBeTruthy();
  expect(actual.allTodos[1].completed).toBeFalsy();
  expect(updateCompletedStub.calledOnce).toBeTruthy();
});

it('toggles todo to incomplete', () => {
  const actual = queryReducer(
    {
      allTodos: [
        { action: 'foo', completed: true, id: 123 },
        { action: 'foo', completed: true, id: 1234 },
      ],
    },
    {
      type: 'TOGGLE_COMPLETED',
      id: 123,
    }
  );

  expect(actual.allTodos[0].completed).toBeFalsy();
  expect(actual.allTodos[1].completed).toBeTruthy();
  expect(updateCompletedStub.calledOnce).toBeTruthy();
});

it('edits a todo', () => {
  const actual = queryReducer(
    {
      allTodos: [
        { action: 'foo', completed: true, id: 123 },
        { action: 'foo', completed: true, id: 1234 },
      ],
    },
    {
      type: 'EDIT',
      id: 123,
      action: 'bar',
    }
  );

  expect(actual.allTodos[0].action).toEqual('bar');
  expect(actual.allTodos[1].action).toEqual('foo');
  expect(updateTodoStub.calledOnce).toBeTruthy();
});

it('deletes a todo', () => {
  const actual = queryReducer(
    {
      allTodos: [
        { action: 'foo', completed: true, id: 123 },
        { action: 'foo', completed: true, id: 1234 },
      ],
    },
    {
      type: 'DELETE',
      id: 123,
    }
  );

  expect(actual.allTodos.length).toEqual(1);
  expect(deleteTodoStub.calledOnce).toBeTruthy();
});
