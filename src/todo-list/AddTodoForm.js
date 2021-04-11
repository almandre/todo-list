import React from 'react';

export default class AddTodoForm extends React.PureComponent {
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(event.target.todoBody.value);
        event.target.todoBody.value = '';
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="todoBody"
                    placeholder="What TODO?"
                />
                <button type="submit">Add TODO</button>
            </form>
        );
    }
}
