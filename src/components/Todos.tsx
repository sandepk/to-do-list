import { useState } from 'react'
import { TodoType, useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom'
import Todo from './Todo';
import { toast } from "react-toastify";
const Todos = ({ searchTodoText }: { searchTodoText: string }) => {
    const { todos, handleDeleteTodo } = useTodos();
    let filteredTodos = todos;

    const [searchParams] = useSearchParams();

    let todoSearchParam = searchParams.get('todos');

    if (todoSearchParam === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed)
    } else if (todoSearchParam === 'inComplete') {
        filteredTodos = todos.filter(todo => !todo.completed)
    } else {
        filteredTodos = todos;
    }
    if (searchTodoText && searchTodoText.toString().trim().length > 0) {
        filteredTodos = filteredTodos.filter(todo => todo.task.toLowerCase().includes(searchTodoText.toLowerCase()))
    }


    let toBeRemoved:string[] = []
    const allowDeletionOfTodo = (id: string) => {
        if (toBeRemoved.includes(id)) {
            handleDeleteTodo(id);
        }
    }
    const handleDeletionOfTodo = (id: string) => {
       toBeRemoved.push(id);
        toast(<Undo onUndo={() => (toBeRemoved = toBeRemoved.filter(t_id => t_id !== id))} />, {
            // hook will be called whent the component unmount
            onClose: () => allowDeletionOfTodo(id)
        });

    }
    filteredTodos = filteredTodos.filter(todo => !toBeRemoved.includes(todo.id));

    type UndoPropTypes = {
        onUndo: () => void;
        closeToast: () => void;
    }

    // create a Undo Component for toast on deletion
    const Undo = ({ onUndo, closeToast }: UndoPropTypes) => {
        const handleClick = () => {
            onUndo();
            closeToast();
            toast('Deletion cancelled', {
                autoClose: 100
            })
        };

        return (
            <div>
                <h3 className='flex justify-between items-center px-2'>
                    Row Deleted <button className="focus:outline-none text-white bg-gray-700 bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-3 py-2" onClick={handleClick}>UNDO</button>
                </h3>
            </div>
        );
    };


    return (
        <>
            <ul className='h-[60vh] max-h-[60vh] overflow-scroll mt-2 border-slate-100 border-2'>
                {
                    filteredTodos.map((todo: TodoType) => {
                        return <Todo key={todo.id} todo={todo} handleDeletionOfTodo={handleDeletionOfTodo} />
                    })

                }
            </ul>

        </>
    )
}

export default Todos