import React from 'react';

export default class TodosLeft extends React.PureComponent {
    activeTodosCount = () =>
        Object.values(this.props.todos).filter(todo => !todo.done)
            .length;

    componentDidMount() {
        document.title = `Active TODOs: ${this.activeTodosCount()}`;
    }

    componentDidUpdate() {
        document.title = `Active TODOs: ${this.activeTodosCount()}`;
    }

    render() {
        return <div>TODOs left: {this.activeTodosCount()}</div>;
    }
}
