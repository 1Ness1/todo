const Form = ({setInputText,inputText, todos, setTodos, setStatus}) => {
    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    };

    const submitTodoHandler = (event) => {
        event.preventDefault();
        setTodos([...todos,
            {text: inputText, completed: false, id: Math.random() * 1000}])

        setInputText('');
    };

    const statusHandler = (event) => {
        setStatus(event.target.value);
    }

    return(
        <form className='form'>
            <input value={inputText} className='todo-input' onChange={inputTextHandler} type="text"/>

            <button className='todo-button' type='submit' onClick={submitTodoHandler}>
                <i className='fas fa-plus-square' />
            </button>

            <div className='select'>
                <select onChange={statusHandler} className='filter-todo' name="todos">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>

        </form>
    );
}

export default Form;