import { useReducer, useRef } from "react"

function TodoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                    id: Date.now(),
                    name: action.payload.name,
                    completed: false 
            }]
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo, completed: !todo.completed
                    }
                }
                return todo
            })
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload.id)
    }
}

function TodoList() {
    const [todos, dispatch] = useReducer(TodoReducer, [])
    const inputEl = useRef(null)
    const name = useRef('')
    return (
        <div>
            <h1>ToDo List</h1>
            <input placeholder="Название задачи" type="text" ref={inputEl} onChange={(event) => {
                name.current = event.target.value
            }}/>
            <button onClick={() => {
                dispatch({type: 'ADD_TODO', payload: {name: name.current}})
                inputEl.current.value = ''
                }}>Добавить</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span className={todo.completed ? 'completed' : 'non-completed'} onClick={() => dispatch({
                            type: 'TOGGLE_TODO',
                            payload: {id: todo.id}
                        })}>
                            {todo.name}
                        </span>
                        <button onClick={() => dispatch({
                            type: 'DELETE_TODO',
                            payload: {id: todo.id}
                        })}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TodoList