import React from 'react';

export default class TodoItem extends React.PureComponent {
    handleCheckboxChange = event => {
        const newDone = event.target.checked;

        this.props.toggleTodoDone(this.props.id, newDone);
    };

    handleXClick = () => this.props.deleteTodo(this.props.id);

    render() {
        const { todo } = this.props;
        const todoStyle = {
            textDecoration: todo.done ? 'line-through' : 'none',
        };

        return (
            <li>
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={this.handleCheckboxChange}
                />
                <span style={todoStyle}>{todo.body}</span>
                <span role="link" onClick={this.handleXClick}>
                    X
                </span>
            </li>
        );
    }
}
