import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';



class CreateTodo extends Component {
    render() {
        console.log("Into the Create Todo compoent!");
        if(localStorage.getItem('token') == null) {
            return <Redirect to="/" />
        }
        return (
            <h1>Create Todo</h1>
        )
    }
}

export default CreateTodo;