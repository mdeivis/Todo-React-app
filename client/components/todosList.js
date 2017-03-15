import React from 'react';

class TodosList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { list: todos, deleteTodo, editTodo, markAsComplete, markAsIncomplete } = this.props;
        const isTodosEmpty = todos.length === 0;

        return(
            <div>
                <h2>TODOS</h2>
                { !isTodosEmpty &&
                    <ul>
                        { todos && todos.map(todo => (
                            <li key={ todo.id }>
                                { !todo.isDone && <span>{ todo.name }</span> }
                                { todo.isDone && <span><strike>{ todo.name }</strike></span> }
                                &nbsp;
                                { !todo.isDone &&
                                    <i
                                        onClick={ () => markAsComplete(todo) }
                                        className="material-icons"
                                    >
                                        check_box_outline_blank
                                    </i>
                                }
                                { todo.isDone &&
                                    <i
                                        onClick={ () => markAsIncomplete(todo) }
                                        className="material-icons"
                                    >
                                        check_box
                                    </i>
                                }

                                &nbsp;
                                <i className="material-icons" onClick={ () => editTodo(todo) }>mode_edit</i>
                                &nbsp;
                               <i className="material-icons" onClick={ () => deleteTodo(todo.id) }>delete_forever</i>

                                { todo.description &&
                                    <div style={{fontStyle: 'italic'}} >{ todo.description }</div>
                                }
                            </li>
                        ))}
                    </ul>
                }

                { isTodosEmpty && <h3>No todos :( </h3> }
            </div>
        );
    }
}

export default TodosList;