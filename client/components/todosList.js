import React, { PropTypes } from 'react';

import TodoItem from 'components/todoItem';

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
                            <TodoItem key={ todo.id }
                                todo={ todo }
                                deleteTodo={ deleteTodo }
                                markAsComplete={ markAsComplete }
                                markAsIncomplete={ markAsIncomplete }
                                editTodo={ editTodo }
                            />
                        ))}
                    </ul>
                }

                { isTodosEmpty && <h3>No todos :( </h3> }
            </div>
        );
    }
}

TodosList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    deleteTodo: PropTypes.func,
    markAsComplete: PropTypes.func,
    markAsIncomplete: PropTypes.func,
    editTodo: PropTypes.func
};

export default TodosList;