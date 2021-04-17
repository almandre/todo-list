import React from 'react';

function TodoItem(props) {
    const { id, todo, toggleTodoDone, deleteTodo } = props;

    const handleCheckboxChange = event => {
        const newDone = event.target.checked;

        toggleTodoDone(id, newDone);
    };

    const handleXClick = () => deleteTodo(id);

    const todoStyle = {
        textDecoration: todo.done ? 'line-through' : 'none',
    };

    return (
        <li data-testid="todo-item">
            <input
                data-testid="todo-item-toggle"
                type="checkbox"
                checked={todo.done}
                onChange={handleCheckboxChange}
            />
            <span data-testid="todo-item-description" style={todoStyle}>{todo.body}</span>
            <span data-testid="todo-item-delete" role="link" onClick={handleXClick}>
                X
            </span>
        </li>
    );
}

export default React.memo(TodoItem);
