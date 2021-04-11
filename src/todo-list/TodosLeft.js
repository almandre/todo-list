import React, { useEffect } from 'react';

const TodosLeft = (props) => {
    const { todos } = props;

    const activeTodosCount =
        Object.values(todos).filter(todo => !todo.done).length;

    useEffect(() => {
        document.title = `Active TODOs: ${ activeTodosCount }`;
    }, [activeTodosCount]);

    return <div>TODOs left: {activeTodosCount}</div>;
};

export default TodosLeft;
