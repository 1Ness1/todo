const Todo = ({todo, todos, setTodos}) => {
    const {text} = todo;

    const deleteHandler = (event) => {
        event.preventDefault();
        setTodos((prev) => todos.filter((element) => element.id !== todo.id));
    };

    const completeHandler = (event) => {
        event.preventDefault();

        setTodos((prev) => (
            todos.map((item) => {
                if(item.id === todo.id) {
                    return {
                        ...item, completed: !item.completed,
                    }
                }
                return item;
            })
        ))
    }

    return(
        <div className='todo'>
            <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>{text}</li>
            <button onClick={completeHandler} className='complete-btn'>
                <i className='fas fa-check' />
            </button>
            <button onClick={deleteHandler} className='trash-btn'>
                <i className='fas fa-trash' />
            </button>
        </div>
    );
}

export default Todo;