import React, { PropTypes } from 'react';

class TodoItem extends React.Component {
    render() {

        const { todo, deleteTodo, editTodo, markAsComplete, markAsIncomplete } = this.props;

        return(
            <li>
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
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object,
    deleteTodo: PropTypes.func,
    markAsComplete: PropTypes.func,
    editTodo: PropTypes.func,
    markAsIncomplete: PropTypes.func
};

export default TodoItem;