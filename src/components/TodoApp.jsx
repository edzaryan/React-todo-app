import { useState } from "react";
import './TodoApp.css';

import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";


function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
}


function TodoApp() {

    const [value, setValue] = useState('');
    const [error, setError] = useState(null);
    const [todos, setTodos] = useState([
        { id: generateUniqueId(), isDone: false, text: 'Go shopping' },
        { id: generateUniqueId(), isDone: true, text: 'Go to gym' },
        { id: generateUniqueId(), isDone: true, text: 'Clean the apartment' },
        { id: generateUniqueId(), isDone: false, text: 'Shave' },
        { id: generateUniqueId(), isDone: false, text: 'Sleep' },
    ]);

    const completedCount = todos.filter(todo => todo.isDone).length;

    function addTodoHandler () {
        if (value.trim() !== '') {
            const newTodo = { 
                id: generateUniqueId(), 
                text: value, 
                isDone: false 
            };
    
            setTodos(prevTodos => [...prevTodos, newTodo]);
            setValue('');
            setError(null);
        } 
        else 
        {
            setError('Please enter a valid todo.');
        }
    }

    function cleanCompletedTodoHandler() {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.isDone));
    }

    function removeTodoHandler(id) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }

    function toggleTodoStatus(id) {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
              if (todo.id === id) {
                return { ...todo, isDone: !todo.isDone };
              }

              return todo;
            });
          });
    }

    return (
        <div className="todo-block">
            <TodoInput
                value={ value }
                onChange={ e => setValue(e.target.value) }
                onAdd={ addTodoHandler }
            />
            { error && <div className="error">{error}</div> }
            <div className="todoListBlock">
                { todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggleStatus={ () => toggleTodoStatus(todo.id) }
                        onRemove={ () => removeTodoHandler(todo.id) }
                    />
                )) }
            </div>
            <div className="todoInfoBlock">
                <div>{ completedCount } / { todos.length } Completed</div>
                <button onClick={ cleanCompletedTodoHandler }>Clear Completed</button>
            </div>
        </div>
    )

}

export default TodoApp;