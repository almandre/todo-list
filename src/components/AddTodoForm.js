import React from 'react';

function AddTodoForm(props) {
    const { onSubmit } = props;

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(event.target.todoBody.value);
        event.target.todoBody.value = '';
    };

    return (
        <form data-testid="add-todo-form" onSubmit={handleSubmit}>
            <input
                data-testid="add-todo-input"
                type="text"
                name="todoBody"
                placeholder="What TODO?"
            />

            <button data-testid="add-todo-button" type="submit">Add TODO</button>
        </form>
    );
}

export default React.memo(AddTodoForm);
