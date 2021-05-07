import axios from 'axios';

const TODO_URL_LOGIN = "http://localhost:8080/todo/login"
const GET_ALL_TODOS = "http://localhost:8080/todo/data"
const CREATE_TODO_API = "http://localhost:8080/todo/create"
const FIND_TODO_BY_ID = "http://localhost:8080/todo/"
const UPDATE_TODO = "http://localhost:8080/todo/update"
const DELETE_TODO_BY_ID = "http://localhost:8080/todo/delete/"

class TodoService {

    login(username, password) {
        return axios.post(TODO_URL_LOGIN, { username, password })
    }

    getAllTodos() {
        return axios.get(GET_ALL_TODOS)
    }

    createTodo(name, description, creator, status) {
        return axios.post(CREATE_TODO_API, { name, description, creator, status });
    }

    findTodoById(id) {
        return axios.get(FIND_TODO_BY_ID+id)
    }

    updateTodo(todo) {
        return axios.post(UPDATE_TODO, todo);
    }

    deleteTodoById(id) {
        return axios.delete(DELETE_TODO_BY_ID+id);
    }

}

export default new TodoService();