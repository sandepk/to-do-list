// import React from 'react'
import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";
import {useNavigate} from 'react-router-dom'
const AddTodo = () => {
    const [todo, setTodo] = useState<string>('');
    const {handleAddTodo} = useTodos();
    const navigate = useNavigate();
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddTodo(todo);
        setTodo("");
        navigate("/");


        
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={todo} onChange={e => setTodo(e.target.value)} className="w-[100%] placeholder:text-slate-400 text-black-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type Something..." />
        <button type="submit" className="w-[100%] placeholder:text-slate-400 text-white bg-black text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 my-5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">Add Task</button>
    </form>
  )
}

export default AddTodo
