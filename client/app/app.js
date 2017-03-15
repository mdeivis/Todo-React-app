import React from 'react';
import {render} from 'react-dom';

import { POST, GET, DELETE, PUT } from 'services/request';
import TodoForm from 'components/todoForm';
import TodosList from 'components/todosList';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            todo: null,
        };

        this.submit = this.submit.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.setEditTodo = this.setEditTodo.bind(this);
        this.unsetEditTodo = this.unsetEditTodo.bind(this);
        this.markAsIncomplete = this.markAsIncomplete.bind(this);
        this.markAsComplete = this.markAsComplete.bind(this);
        this.updateIsDone = this.updateIsDone.bind(this);
    }

    componentWillMount() {
        GET('/api/todo')
            .then(res => {
                this.setState({ todos: res.data });
            })
            .catch(err => {
                console.error(err);
                alert(err)
            });
    }

    deleteTodo(id) {
        DELETE('/api/todo', id)
            .then(() => {
                const todos = this.state.todos.filter(todo => todo.id !== id);

                if (this.state.todo) {
                    this.unsetEditTodo();
                }

                this.setState({ todos });
            })
            .catch(err => {
                console.error(err);
                alert(err)
            });
    }

    setEditTodo(todo) {
        this.setState({ todo });
    }

    unsetEditTodo() {
        this.setState({ todo: null });
    }

    submit(data) {
        if (this.state.todo) {
            PUT('/api/todo', this.state.todo.id, data)
                .then(res => {
                    const todos = this.state.todos.map(todo => {
                        if (todo.id === this.state.todo.id) {
                            return res.data;
                        }

                        return todo;
                    });

                    this.unsetEditTodo();

                    this.setState({ todos })
                })
                .catch(err => {
                    console.error(err);
                    alert(err.response.data);
                });
        } else {
            POST('/api/todo', data)
                .then(res => {
                    const { todos } = this.state;

                    todos.push(res.data);

                    this.setState({ todos })
                })
                .catch(err => {
                    console.error(err);
                    alert(err.response.data);
                });
        }
    }

    updateIsDone(currentTodo, status) {
        const postData = currentTodo;
        postData.isDone = status;

        PUT('/api/todo', currentTodo.id, postData)
            .then(res => {
                const todos = this.state.todos.map(todo => {
                    if (todo.id === currentTodo.id) {
                        return res.data;
                    }

                    return todo;
                });

                this.setState({ todos })
            })
            .catch(err => {
                console.error(err);
                alert(err.response.data);
            });
    }

    markAsComplete(todo) {
        this.updateIsDone(todo, true);
    }

    markAsIncomplete(todo) {
        this.updateIsDone(todo, false);
    }

    render () {

        const { todos, todo } = this.state;

        return (
            <div>
                <TodoForm
                    submit={ this.submit }
                    todo={ todo }
                    cancel={ this.unsetEditTodo }
                    deleteTodo={ this.deleteTodo }
                />
                <TodosList
                    list={ todos }
                    deleteTodo={ this.deleteTodo }
                    editTodo={ this.setEditTodo }
                    markAsComplete={ this.markAsComplete }
                    markAsIncomplete={ this.markAsIncomplete }
                />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
