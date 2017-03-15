import React, { PropTypes } from 'react';

class TodoForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            isDone: 'no'
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();

        const postData = this.state;

        postData.isDone = postData.isDone === 'yes';

        this.props.submit(postData);
    }

    handleChange(event, name) {
        const state = this.state;

        state[name] = event.target.value;

        this.setState(state);
    }

    componentWillReceiveProps() {
        // uh. Ugly hack!
        setTimeout(() => {
            if (this.props.todo) {
                const { todo } = this.props;

                this.setState({
                    name: todo.name,
                    description: todo.description,
                    isDone: todo.isDone ? 'yes' : 'no'
                });
            } else {
                this.setState({
                    name: '',
                    description: '',
                    isDone: 'no'
                });
            }
        }, 0);
    }

    render() {

        const { todo, cancel, deleteTodo } = this.props;
        const { name, description, isDone } = this.state;

        const header = todo ? 'Update todo' : 'Create a new todo';
        const buttonText = todo ? 'Update' : 'Create';

        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>{ header }</h1>

                <div>
                    <div><strong>Name</strong></div>
                    <input
                        type="text"
                        name="name"
                        value={ name }
                        placeholder="Todo name"
                        onChange={ e => this.handleChange(e, 'name') }
                    />
                </div>

                <br />

                <div>
                    <div><strong>Description</strong></div>
                    <textarea
                        name="description"
                        onChange={ e => this.handleChange(e, 'description') }
                        value={ description }
                    />
                </div>

                <div>
                    <div><strong>Is completed</strong></div>
                    <label>
                        <input
                            type="radio"
                            value="yes"
                            onChange={ e => this.handleChange(e, 'isDone') }
                            checked={ isDone === 'yes' }
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="no"
                            onChange={ e => this.handleChange(e, 'isDone') }
                            checked={ isDone === 'no' }
                        />
                        No
                    </label>
                </div>

                <div>
                    <br />
                    <button type="submit">
                        { buttonText }
                    </button>

                    &nbsp;

                    { todo &&
                        <span onClick={ cancel }>
                            Cancel
                        </span>
                    }

                    { todo &&
                        <i className="material-icons"
                           onClick={ () => deleteTodo(todo.id) }
                        >
                            delete_forever
                        </i>
                    }
                    <br />
                    <hr />
                </div>
            </form>
        );
    }
}

TodoForm.propTypes = {
    todo: PropTypes.object,
    cancel: PropTypes.func,
    deleteTodo: PropTypes.func
};

export default TodoForm;