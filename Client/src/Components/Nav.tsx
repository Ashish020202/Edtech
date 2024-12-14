import { useNavigate } from 'react-router'



const Nav = () => {
    const navigate = useNavigate()

    const LogOut = () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <div>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            LearnYard
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg" onClick={()=>navigate('/login')}>
                            LogIn
                        </button>
                        <button onClick={LogOut} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                            LogOut
                        </button>
                    </div>
                </div>
            </nav>
      
    </div>
  )
}

export default Nav
