import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TodoService from '../../TodoService';
import CreateTodoPopUp from '../CreateTodoPopUp/CreateTodoPopUp';
import DeletePopup from '../DeletePopup/DeletePopup';
import EditTodoPopup from '../EditTodo/EditTodoPopup';
import Header from '../Header/Header';
import './TodosList.css'; 

class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : [],
            menu: [
                {
                    key: "My Todos",
                    value: "/todos"
                }
            ],
            togglePopup: false,
            editPopup: false,
            deletePopup: false,
            todoForEdit: {}
        }
        this.handleCreateTodoPopUp = this.handleCreateTodoPopUp.bind(this);
        this.handleEditPopUp = this.handleEditPopUp.bind(this);
        this.updateTodos = this.updateTodos.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeEditPopUp = this.closeEditPopUp.bind(this);
    }

    closeEditPopUp() {
        var { editPopup } = this.state;
        this.setState({editPopup: !editPopup})
    }

    handleCreateTodoPopUp() {
        var { togglePopup } = this.state;
        this.setState({togglePopup : !togglePopup});
    }

    handleEditPopUp(id) {
        console.log("id : "+id);
        TodoService.findTodoById(id).then(
            res => {
                this.setState({todoForEdit:res.data})
                var { editPopup } = this.state;
                this.setState({editPopup: !editPopup});
            }
        )
    }

    handleDelete(id) {
       TodoService.deleteTodoById(id).then(
           res => {
               if(res.status === 200) {
                    this.setState({deletePopup:true});
                    setTimeout(() => {
                        this.setState({deletePopup:false})
                        this.updateTodos();
                    },3000)
               }
           }
       )
    } 

    componentDidMount() {
        TodoService.getAllTodos().then(
            res => {
                this.setState({todos: res.data})
            }
        )
    }

    updateTodos() {
        TodoService.getAllTodos().then(
            res => {
                this.setState({todos: res.data})
            }
        )
    }

    render() {
        if(localStorage.getItem('token') == null) {
            return <Redirect to="/" />
        }
        const { todos, menu, togglePopup, editPopup, todoForEdit, deletePopup } = this.state
        return (
            <>
            <Header menu={menu} />
            <div className="create-block"><i class="fa fa-plus" aria-hidden="true" onClick={this.handleCreateTodoPopUp}> Create Todo</i></div>
            <table className="table-wrapper">
                <thead>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Creator</th>
                    <th>Created On</th>
                    <th>Modified On</th>
                    <th>Modified By</th>
                    <th>Status</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                        todos.map(
                            todo => 
                                <tr id={todo.id}>
                                    <td>{todo.name}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.creator}</td>
                                    <td>{todo.createdOn}</td>
                                    <td>{todo.modifiedOn}</td>
                                    <td>{todo.modifiedBy}</td>
                                    <td>{todo.status}</td>
                                    <td>
                                        <div style={{float:'left', cursor:'pointer'}}><i class="fa fa-edit" onClick={() => this.handleEditPopUp(todo.id)}>Edit</i></div>
                                        <div style={{float:'right', cursor:'pointer'}}><i class="fa fa-trash" onClick={() => this.handleDelete(todo.id)}>Delete</i></div>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            {
                togglePopup && <CreateTodoPopUp handleClose={this.handleCreateTodoPopUp} updateTodos={this.updateTodos}/>
            }
            {
                editPopup && <EditTodoPopup handleClose={this.closeEditPopUp} todoForEdit={todoForEdit} updateTodos={this.updateTodos} />
            }
            {
                deletePopup && <DeletePopup />
            }
        </>
        )
    }
}

export default TodosList;
