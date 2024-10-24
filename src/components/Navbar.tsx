import { Link, useSearchParams } from 'react-router-dom'

const Navbar = () => {

    const [searchParams] = useSearchParams();
    let todosData = searchParams.get("todos");
    console.log("🚀 ~ Navbar ~ searchParams:", todosData)
    return (
        <nav className='flex justify-between items-center'>
            <Link to="/"><button className={`focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 ${todosData === null ? 'bg-green-700' : ""} `}>All</button> </Link>
            <Link to="/?todos=completed"><button className={`focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-2.5 py-2.5 mr-5  ${todosData === "completed" ? 'bg-green-700' : ""} `}>Completed</button> </Link>
            <Link to="/?todos=inComplete"><button className={`focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-2.5 py-2.5 ${todosData === "inComplete" ? 'bg-green-700' : ""} `}>InComplete</button> </Link>
        </nav>
    )
}

export default Navbar