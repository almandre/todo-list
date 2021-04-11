import React from 'react';

const AddTodoForm = (props) => {
    const { onSubmit } = props;

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(event.target.todoBody.value);
        event.target.todoBody.value = '';
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="todoBody"
                placeholder="What TODO?"
            />
            <button type="submit">Add TODO</button>
        </form>
    );
};

export default AddTodoForm;
