import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import TodoItem from './TodoItem';

it('renders a todo item', () => {
  const component = renderer.create(
    <TodoItem id="123" checked={false} action="hello world" />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a completed todo item', () => {
  const component = renderer.create(
    <TodoItem id="123" checked action="hello world" />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('triggers a dispatch when completed', () => {
  const dispatch = stub();
  const component = shallow(
    <TodoItem
      id="123"
      checked={false}
      action="hello world"
      dispatch={dispatch}
    />
  );

  component.find('input').simulate('change');
  expect(dispatch.firstCall.args).toEqual([
    { id: '123', type: 'TOGGLE_COMPLETED' },
  ]);
});

xit('triggers a dispatch when editing', () => {
  const dispatch = stub();
  const component = shallow(
    <TodoItem
      id="123"
      checked={false}
      action="hello world"
      dispatch={dispatch}
    />
  );

  component.find('span').first().simulate('doubleClick');
  expect(dispatch.firstCall.args).toEqual([
    { action: 'foo', id: '123', type: 'EDIT' },
  ]);
});

it('triggers a dispatch when deleted', () => {
  const dispatch = stub();
  const component = shallow(
    <TodoItem
      id="123"
      checked={false}
      action="hello world"
      dispatch={dispatch}
    />
  );

  component.find('button').simulate('click');
  expect(dispatch.firstCall.args).toEqual([{ id: '123', type: 'DELETE' }]);
});
