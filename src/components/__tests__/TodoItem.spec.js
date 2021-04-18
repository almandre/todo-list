import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../TodoItem';

const renderComponent = (
    todoId,
    todo,
    toggleTodoDone = jest.fn(),
    deleteTodo = jest.fn()
) => render(
    <TodoItem
        key={todoId}
        id={todoId}
        todo={todo}
        toggleTodoDone={toggleTodoDone}
        deleteTodo={deleteTodo}
    />
);

const testIds = {
  todos: 'todo-item',
  description: 'todo-item-description',
  toggleCheckbox: 'todo-item-toggle',
  deleteLink: 'todo-item-delete',
}

describe('TodoList', () => {
    const todo = { body: 'Test Test' };

    beforeEach(() => {
        todo.done = false;
    });

    afterEach(() => {
        cleanup();
    });

    test('should render a completed todo', () => {
        todo.done = true;

        const { getByTestId } = renderComponent(1, todo);
        const description = getByTestId(testIds.description);
        const toggleCheckbox = getByTestId(testIds.toggleCheckbox);
        const deleteLink = getByTestId(testIds.deleteLink);

        expect(toggleCheckbox).toBeChecked();
        expect(description).toHaveTextContent('Test Test');
        expect(description).toHaveStyle('text-decoration: line-through');
        expect(deleteLink).toBeDefined();
    });

    test('should render an active todo', () => {
        const { getByTestId } = renderComponent(1, todo);
        const description = getByTestId(testIds.description);
        const toggleCheckbox = getByTestId(testIds.toggleCheckbox);
        const deleteLink = getByTestId(testIds.deleteLink);

        expect(toggleCheckbox).not.toBeChecked();
        expect(description).toHaveTextContent('Test Test');
        expect(description).toHaveStyle('text-decoration: none');
        expect(deleteLink).toBeDefined();
    });

    test('should return the todo id and new checkbox status', () => {
        const todoId = 1;
        const changeStatus = jest.fn();
        const { getByTestId } = renderComponent(todoId, todo, changeStatus);
        const toggleCheckbox = getByTestId(testIds.toggleCheckbox);

        fireEvent.click(toggleCheckbox);

        expect(toggleCheckbox).not.toBeChecked();
        expect(changeStatus).toHaveBeenCalledWith(todoId, !todo.done);
    });

    test('should return the deleted todo id', () => {
        const todoId = 1;
        const deleteTodo = jest.fn();
        const { getByTestId } = renderComponent(todoId, todo, null, deleteTodo);
        const deleteLink = getByTestId(testIds.deleteLink);

        fireEvent.click(deleteLink);

        expect(deleteTodo).toHaveBeenCalledWith(todoId);
    });
});
