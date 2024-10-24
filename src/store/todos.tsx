import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

export type TodosProviderProps = {
    children: ReactNode
}

export type TodoType = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}
export type TodosContext = {
    todos: TodoType[];
    // toRemove: string[];
    //call signature
    handleAddTodo: (task: string) => void,
    toggleTodoAsCompleted: (todoId: string) => void,
    handleDeleteTodo: (todoId: string) => void

}


export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {

    const [todos, setTodos] = useState<TodoType[]>(() => {
        try {
            const todosFromLocalStorage = localStorage.getItem("todos") || "[]"
            return JSON.parse(todosFromLocalStorage) as TodoType[];
        } catch (error) {
            return []
        }
    });

    const handleAddTodo = (task: string) => {
        if (task.trim().length === 0) {
            toast.warn('Please add task')
            return
        }
        if (todos.some(todo => todo.task === task)) {
            toast.warn("Task already existing");
            return;
        }
        setTodos(prev => {
            const newTodos: TodoType[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        })
        toast.success(`Todo: ' ${task} ' added successfully!`);
    }

    // mark completed
    const toggleTodoAsCompleted = (todoId: string) => {
        setTodos(prev => {
            let newTodos = prev.map(todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            console.log("prev", prev);
            console.log("newTodos: ", newTodos);

            return newTodos
        })
    }


    // Delete individual Todo
    const handleDeleteTodo = (todoId: string) => {
        setTodos(prev => {
            const filteredTodos = prev.filter(todo => todo.id !== todoId);
            localStorage.setItem("todos", JSON.stringify(filteredTodos))
            return filteredTodos
        })
    }

    return <todosContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo }}>
        {children}
    </todosContext.Provider>
}

export const useTodos = () => {
    const todosConsumer = useContext(todosContext);

    if (!todosConsumer) {
        throw new Error("useTodos used outside of provider")
    }
    return todosConsumer
}



// actions and types for deletion / undo of Removal of individual Todo

// enum TodoActionTypes {
//     QUEUE_FOR_REMOVAL = 'QUEUE_FOR_REMOVAL',
//     CLEAN_COLLECTION = 'CLEAN_COLLECTION',
//     UNDO = 'UNDO',
//   }