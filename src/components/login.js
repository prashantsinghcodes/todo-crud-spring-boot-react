import React, { Component } from 'react';
import TodoService from '../TodoService';
import { Redirect } from 'react-router-dom';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }) 
    }

    componentDidMount() {
        if(localStorage.getItem('token') != null) {
            this.setState({loggedIn: true})
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state
        TodoService.login(username, password).then(
            res => {
               localStorage.setItem('token', res.data.token)
               this.setState({loggedIn: true})
            }
        )
    }

    render() {
       var { username, password, loggedIn } = this.state
       if(loggedIn) {
         return <Redirect to="/todos" />
       }
        return (
            <div className="app-container">
            <div><h2 className="app-name">Todo App</h2></div>
            <div className="formStyle">
                <h1 className="login">Login here</h1>
                <form onSubmit={this.handleSubmit}>
                    <table className="login-table">
                        <tr>
                            <td><label>Username:</label></td>
                            <td><input type="text" name="username" value={username} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                             <td><input type="password" name="password" value={password} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="SUBMIT" /></td>
                        </tr>
                    </table>
                </form>
            </div>
          </div>
        )
    }
}

export default Login;