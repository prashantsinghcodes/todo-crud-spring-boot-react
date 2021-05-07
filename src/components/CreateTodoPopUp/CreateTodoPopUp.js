import React, { Component } from 'react';
import TodoService from '../../TodoService';
import './CreateTodoPopUp.css';

class CreateTodoPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            creator: 'prashant',
            status: '',
            alert: false,
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, description, creator, status } = this.state
        TodoService.createTodo(name, description, creator, status).then(
            res => {
                if(res.status===200){
                    this.setState({ alert: true, message: 'Todo Created Successfully!'})
                    setTimeout(() => { 
                        this.props.handleClose();
                        this.props.updateTodos();
                     }, 3000);
                }
            }
        )
    }

    handleChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        const { name, description, creator, status, alert, message } = this.state;
        return(
            <div className="popup-box">
                <div className="box">
                    <h1 className="create-todo">Create Todo</h1>
                    <span className="close-icon" onClick={this.props.handleClose}>x</span>
                    <form onSubmit={this.handleSubmit}>
                        <table className="create-table">
                            <tr>
                                <td>Name:</td>
                                <td><input type="text" name="name" value={name} onChange={this.handleChange}  /></td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td><input type="text" name="description" value={description} onChange={this.handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Creator:</td>
                                <td><input type="text" name="creator" value={creator} readOnly /></td>
                            </tr>
                            <tr>
                                <td>Status:</td>
                                <td>
                                    <div className="controls" onChange={this.handleChange}>
                                        <label className="radio">
                                            <input type="radio" name="status" value="pending" checked={status==="pending"}/>Pending
                                        </label>
                                        <label className="radio">
                                            <input type="radio" name="status" value="In progress" checked={status==="In progress"}/>In progress
                                        </label>
                                        <label className="radio">
                                            <input type="radio" name="status" value="completed" checked={status==="completed"}/>Completed
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><center><input id="submit-btn" type="submit" value="Create Todo" /></center></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><center>{alert && <p className="success-msg">{message}</p>}</center></td>
                            </tr>
                        </table>
                        </form>
                </div>
            </div>
        )
    }
}

export default CreateTodoPopUp;