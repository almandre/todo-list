import React, { useEffect } from 'react';

function TodosLeft(props) {
    const { todos } = props;

    const activeTodosCount =
        Object.values(todos).filter(todo => !todo.done).length;

    useEffect(() => {
        document.title = `Active TODOs: ${ activeTodosCount }`;
    }, [activeTodosCount]);

    return <div data-testid="todo-left">TODOs left: {activeTodosCount}</div>;
}

export default React.memo(TodosLeft);
