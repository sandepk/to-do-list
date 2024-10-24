// import React from 'react'

import { TodoType, useTodos } from "../store/todos"


export type TodoProp = {
    todo: TodoType;
    handleDeletionOfTodo: (id: string) => void
}

const Todo = ({ todo, handleDeletionOfTodo }: TodoProp) => {
    const { toggleTodoAsCompleted } = useTodos();
    return (
        <li key={todo.id} className={`p-2 mt-2 rounded-lg flex justify-between items-center border-2 border-gray-100 ${todo.completed && 'bg-[#E8F3E1] border-green-100'}`}>
            <div>
                <input type="checkbox" id={`todos-${todo.id}`} className="m-1 mr-5 border-[50%]" checked={todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)} />
                <label htmlFor={`todos-${todo.id}`} className={`${todo.completed && 'line-through'}`} >{todo.task}</label>
            </div>
            {
                todo.completed && <button type='button' className="text-center mr-2" onClick={() => handleDeletionOfTodo(todo.id)}>x</button>
            }
        </li>
    )
}

export default Todo