import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodosLeft from '../TodosLeft';

const todoLeftId = 'todo-left';
const renderComponent = (todos) => render(<TodosLeft todos={{todos}} />);

describe('TodosLeft', () => {
    const createTodo = () => {
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

    test('should display number of todos left', async () => {
        const todo = createTodo();
        todo.add(1, 'Test Test');
        let { getByTestId } = renderComponent(todo.items);
        const todoLeft = getByTestId(todoLeftId);

        expect(todoLeft).toHaveTextContent(1);
    });
});
