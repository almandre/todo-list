import React from 'react';
import { cleanup, render, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

const renderComponent = (todos) => render(<TodoList initialData={{ todos }} />);

const testIds = {
  todoItems: 'todo-item',
  form: 'add-todo-form',
  toggleCheckbox: 'todo-item-toggle',
  description: 'todo-item-description',
  deleteLink: 'todo-item-delete',
  filtersButton: 'filter-button',
  deleteButton: 'delete-todo-button',
  todoLeft: 'todo-left',
}

const createTodoList = () => {
  const todos = {};

  return {
      items: () => todos,
      add: (id, body, done = false) => {
          todos[id] = {
              body,
              done
          }
      },
  }
}

const typeTodo = (value) => ({
  target: {
      todoBody: {
          value
      }
  }
});

describe('TodoList', () => {
  let todoList;

  beforeEach(() => {
    todoList = createTodoList();
    todoList.add('A', 'Todo A', true);
    todoList.add('B', 'Todo B', true);
    todoList.add('C', 'Todo C');
    todoList.add('D', 'Todo D', true)
  });

  afterEach(() => {
    cleanup();
  });

  test('should render the todo list component', () => {
    const { getByTestId, getAllByTestId } = renderComponent(todoList.items);
    const todoItems = getAllByTestId(testIds.todoItems);
    const form = getByTestId(testIds.form);
    const filtersButton = getAllByTestId(testIds.filtersButton);
    const deleteButton = getByTestId(testIds.deleteButton);
    const todoLeft = getByTestId(testIds.todoLeft);

    expect(todoItems).toHaveLength(4);
    expect(filtersButton).toHaveLength(3);
    expect(form).toBeDefined();
    expect(deleteButton).toBeDefined();
    expect(todoLeft).toBeDefined();
  });

  test('should add a new todo into list', () => {
    const todoList = createTodoList();
    const { getByTestId, getAllByTestId } = renderComponent(todoList.items);
    const form = getByTestId(testIds.form);

    fireEvent.change(form, typeTodo('Test Test'));
    fireEvent.submit(form);

    let todoItems = getAllByTestId(testIds.todoItems);
    const todoLeft = getByTestId(testIds.todoLeft);

    expect(todoItems).toHaveLength(1);
    expect(todoLeft).toHaveTextContent(1);

    fireEvent.change(form, typeTodo('Another Test'));
    fireEvent.submit(form);

    todoItems = getAllByTestId(testIds.todoItems);

    expect(todoItems).toHaveLength(2);
    expect(todoLeft).toHaveTextContent(2);
  });

  test('should change the todo checkbox', () => {
    const { getByTestId, getByText } = renderComponent(todoList.items);
    const todoItem = getByText('Todo C').parentElement;
    const toggleCheckbox = within(todoItem).getByTestId(testIds.toggleCheckbox);
    const todoLeft = getByTestId(testIds.todoLeft);

    expect(toggleCheckbox).not.toBeChecked();
    expect(todoLeft).toHaveTextContent(1);

    fireEvent.click(toggleCheckbox);

    expect(toggleCheckbox).toBeChecked();
    expect(todoLeft).toHaveTextContent(0);
  });

  test('should delete one todo', () => {
    const { getByTestId, getByText, getAllByTestId } = renderComponent(todoList.items);
    const todoItem = getByText('Todo C').parentElement;
    const deleteLink = within(todoItem).getByTestId(testIds.deleteLink);
    const todoLeft = getByTestId(testIds.todoLeft);
    let todoItems = getAllByTestId(testIds.todoItems);

    expect(todoItems).toHaveLength(4);
    expect(todoLeft).toHaveTextContent(1);

    fireEvent.click(deleteLink);
    todoItems = getAllByTestId(testIds.todoItems);

    expect(todoItems).toHaveLength(3);
    expect(todoLeft).toHaveTextContent(0);

    todoItems.forEach(todoItem => {
      const { textContent } = within(todoItem).getByTestId(testIds.description);
      expect(textContent).not.toBe('Todo C');
    });
  });

  test('should delete all completed todos', () => {
    const { getByTestId, getAllByTestId } = renderComponent(todoList.items);

    const deleteButton = getByTestId(testIds.deleteButton);
    const todoLeft = getByTestId(testIds.todoLeft);
    let todoItems = getAllByTestId(testIds.todoItems);

    expect(todoItems).toHaveLength(4);
    expect(todoLeft).toHaveTextContent(1);

    fireEvent.click(deleteButton);
    todoItems = getAllByTestId(testIds.todoItems);

    expect(todoItems).toHaveLength(1);
    expect(todoLeft).toHaveTextContent(1);
  });
});
