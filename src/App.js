import {useState, useMemo} from "react";
import Form from './components/Form';
import TodoList from "./components/TodoList";

import './App.css';

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    };

    return [storedValue, setValue]
}

const filterTodosByStatus = (todos, filter) => {
    if (filter === 'all') {
        return todos;
    }

    if (filter === 'completed') {
        return todos.filter((todo) => (todo.completed === true))
    }

    if (filter === 'uncompleted') {
        return todos.filter((todo) => (todo.completed === false))
    }
}

function App() {
    const [inputText, setInputText] = useState('');
    const [todos, setTodos] = useLocalStorage('todos', [])
    const [status, setStatus] = useState('all');

    const filteredTodos = useMemo(() => {
        return filterTodosByStatus(todos, status);
    }, [todos, status])

    return (
        <div className="App">
            <header className='header'>
                <h1>Ed's Todo list</h1>
            </header>

            <Form setInputText={setInputText} inputText={inputText} todos={todos} setTodos={setTodos}
                  setStatus={setStatus}/>
            <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
        </div>
    );
}

export default App;
