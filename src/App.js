import './App.css';
import Login from './components/login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateTodo from './components/CreateTodo';
import TodosList from './components/TodosList/TodosList';
import React, { Component } from 'react';


class App extends Component {
  render() {
    return(
      <>
         <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/create-todo" component={CreateTodo} />
            <Route exact path="/todos" component={TodosList} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
