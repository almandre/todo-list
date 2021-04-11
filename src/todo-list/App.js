import React from 'react';

import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import FilterButton from './FilterButton';
import TodosLeft from './TodosLeft';

class App extends React.Component {
  state = {
    todos: this.props.initialData.todos,
    filterLabel: 'All',
  };

  addNewTodo = newTodoBody =>
    this.setState(prevState => ({
      todos: {
        ...prevState.todos,
        [uniqueId()]: {
          body: newTodoBody,
          done: false,
        },
      },
    }));

  toggleTodoDone = (todoId, newDoneValue) =>
    this.setState(prevState => ({
      todos: {
        ...prevState.todos,
        [todoId]: {
          ...prevState.todos[todoId],
          done: newDoneValue,
        },
      },
    }));

  deleteTodo = todoId =>
    this.setState(prevState => {
      const { [todoId]: _, ...todos } = prevState.todos;
      return { todos };
    });

  deleteAllDoneTodos = () =>
    this.setState(prevState => ({
      todos: Object.entries(prevState.todos).reduce(
        (acc, [todoId, todo]) => {
          if (!todo.done) {
            acc[todoId] = todo;
          }
          return acc;
        },
        {}
      ),
    }));

  setFilter = newFilterLabel =>
    this.setState({ filterLabel: newFilterLabel });

  shouldShowTodo = todo => {
    const { filterLabel } = this.state;
    return (
      filterLabel === 'All' ||
      (filterLabel === 'Active' && !todo.done) ||
      (filterLabel === 'Completed' && todo.done)
    );
  };

  render() {
    return (
      <>
        <header>TODO List</header>

        <ul>
          {Object.entries(this.state.todos).map(
            ([todoId, todo]) =>
              this.shouldShowTodo(todo) && (
                <TodoItem
                  key={todoId}
                  id={todoId}
                  todo={todo}
                  toggleTodoDone={this.toggleTodoDone}
                  deleteTodo={this.deleteTodo}
                />
              )
          )}
        </ul>

        <AddTodoForm onSubmit={this.addNewTodo} />

        <div className="actions">
          Show:{' '}
          <FilterButton
            label="All"
            onClick={this.setFilter}
            active={this.state.filterLabel === 'All'}
          />
          <FilterButton
            label="Active"
            onClick={this.setFilter}
            active={this.state.filterLabel === 'Active'}
          />
          <FilterButton
            label="Completed"
            onClick={this.setFilter}
            active={this.state.filterLabel === 'Completed'}
          />
        </div>

        <div className="actions">
          <button onClick={this.deleteAllDoneTodos}>
            Delete All Completed
          </button>
        </div>

        <footer>
          <TodosLeft todos={this.state.todos} />
        </footer>
      </>
    );
  }
}

const uniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36);

export default App;
