import React, { useState, useMemo } from 'react';

import uniqueId from '../uniqueId';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import FilterButton from './FilterButton';
import TodosLeft from './TodosLeft';

const TodoList = (props) => {
  const { initialData } = props;

  const [todos, setTodos] = useState(initialData.todos);
  const [filterLabel, setFilterLabel] = useState('All');

  const {
    addNewTodo,
    toggleTodoDone,
    deleteTodo,
    deleteAllDoneTodos,
  } = useMemo(
    () => ({
      addNewTodo: newTodoBody =>
        setTodos(prevTodos => ({
          ...prevTodos,
          [uniqueId()]: {
            body: newTodoBody,
            done: false,
          },
        })),

      toggleTodoDone: (todoId, newDoneValue) =>
        setTodos(prevTodos => ({
          ...prevTodos,
          [todoId]: {
            ...prevTodos[todoId],
            done: newDoneValue,
          },
        })),

      deleteTodo: todoId =>
        setTodos(prevTodos => {
          const { [todoId]: _, ...todos } = prevTodos;
          return todos;
        }),

      deleteAllDoneTodos: () =>
        setTodos(prevTodos =>
          Object.entries(prevTodos).reduce((acc, [todoId, todo]) => {
            if (!todo.done) {
              acc[todoId] = todo;
            }
            return acc;
          }, {})
        ),
    }),
    []
  );

  const shouldShowTodo = todo =>
    filterLabel === 'All' ||
    (filterLabel === 'Active' && !todo.done) ||
    (filterLabel === 'Completed' && todo.done);

  return (
    <>
      <header>TODO List</header>

      <ul>
        {Object.entries(todos).map(
          ([todoId, todo]) =>
            shouldShowTodo(todo) && (
              <TodoItem
                key={todoId}
                id={todoId}
                todo={todo}
                toggleTodoDone={toggleTodoDone}
                deleteTodo={deleteTodo}
              />
            )
        )}
      </ul>

      <AddTodoForm onSubmit={addNewTodo} />

      <div className="actions">
        Show:{' '}
        <FilterButton
          label="All"
          onClick={setFilterLabel}
          active={filterLabel === 'All'}
        />
        <FilterButton
          label="Active"
          onClick={setFilterLabel}
          active={filterLabel === 'Active'}
        />
        <FilterButton
          label="Completed"
          onClick={setFilterLabel}
          active={filterLabel === 'Completed'}
        />
      </div>

      <div className="actions">
        <button onClick={deleteAllDoneTodos}>
          Delete All Completed
        </button>
      </div>

      <footer>
        <TodosLeft todos={todos} />
      </footer>
    </>
  );
}

export default TodoList;
