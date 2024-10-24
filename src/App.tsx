import AddTodo from "./components/AddTodo"
import Todos from "./components/Todos"
import Navbar from "./components/Navbar"
import { useState } from "react"
import {useDebounce} from './hooks/useDebounce';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [searchedTodoText, setSearchedTodoText] = useState<string>('')
  const debouncedSearchedText = useDebounce(searchedTodoText, 1000);
  
  return (
    <>
      <p className="mt-5 ml-2 text-lg">Simple To-do List App</p>
      <main className="w-[100vw] h-[92vh] bg-[#82B072] flex justify-center items-center">
        <div className="bg-white w-[95%] sm:h-[90%] h-[95%] p-3 shadow-md hover:shadow-lg rounded-md">
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex items-center min-w-[50%] md:mb-3 sm: mb-3">
              <h1 className="mr-3">Today</h1>
              <input type="text" className="min-w-[80%] p-2 rounded-2 focus:border-blue-300" placeholder="search" value={searchedTodoText} onChange={(e) => setSearchedTodoText(e.target.value)} />
            </div>
            <Navbar />
          </div>
          <div>
            <Todos searchTodoText = {debouncedSearchedText} />
          </div>
          <AddTodo />
        </div>

      </main>
      <ToastContainer closeOnClick={false} closeButton={true} />
    </>
  )
}

export default App
