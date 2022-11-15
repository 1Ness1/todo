import {useState, useEffect} from "react";
import Form from './components/Form';
import TodoList from "./components/TodoList";

import './App.css';

function App() {
    const [inputText, setInputText] = useState('');
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [status, setStatus] = useState('all');

    const filterHandler = () => {
        if(status === 'all') {
            setFilteredTodos(todos);
        }

        if(status === 'completed') {
            setFilteredTodos(todos.filter((todo) => (todo.completed === true)))
        }
        if(status === 'uncompleted') {
            setFilteredTodos(todos.filter((todo) => (todo.completed === false)))
        }
    }

    const getLocalTodos = () => {
        if(localStorage.getItem('todos')) {
            const todosLocal = JSON.parse(localStorage.getItem('todos'));
            setTodos(todosLocal);
            return;
        }

        localStorage.setItem('todos', JSON.stringify([]));
    }

    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    useEffect(() => {
        getLocalTodos();
    }, []);

    useEffect(() => {
        filterHandler();
        saveLocalTodos();
    }, [todos, status]);

    return (
    <div className="App">
        <header className='header'>
            <h1>Ed's Todo list</h1>
        </header>

        <Form setInputText={setInputText} inputText={inputText} todos={todos} setTodos={setTodos} setStatus={setStatus} />
        <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
