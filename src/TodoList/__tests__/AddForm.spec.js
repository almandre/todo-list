import React from 'react';
import { render, cleanup, fireEvent, within } from '@testing-library/react';
import AddForm from '../AddTodoForm';

const testIds = {
    formId: 'add-todo-form',
    inputId: 'add-todo-input',
    buttonId: 'add-todo-button'
}

const renderComponent = (
    onSubmit = jest.fn()
) => render(
    <AddForm
        onSubmit={onSubmit}
    />
);

describe('AddForm', () => {
    afterEach(() => {
        cleanup();
    });

    test('should render the todo add form', () => {
        const { getByTestId } = renderComponent();
        const form = getByTestId(testIds.formId);
        const input = within(form).getByTestId(testIds.inputId);
        const button = within(form).getByTestId(testIds.buttonId);

        expect(form).toBeDefined();
        expect(input).toBeDefined();
        expect(button).toBeDefined();
    });

    test('should return the input value', () => {
        const addTodo = jest.fn();
        const { getByTestId } = renderComponent(addTodo);
        const form = getByTestId(testIds.formId);
        const input = within(form).getByTestId(testIds.inputId);

        input.setAttribute('value', 'Test Test');
        fireEvent.submit(form);

        expect(addTodo).toHaveBeenCalledWith('Test Test');
    });
});
