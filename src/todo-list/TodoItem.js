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
        <li>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={handleCheckboxChange}
            />
            <span style={todoStyle}>{todo.body}</span>
            <span role="link" onClick={handleXClick}>
                X
            </span>
        </li>
    );
}

export default React.memo(TodoItem);
