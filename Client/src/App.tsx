import { Book, Globe, Video, ArrowRight } from 'lucide-react';
import Nav from './Components/Nav';
import { useNavigate } from 'react-router';

const EdTechLandingPage: React.FC = () => {

    const navigate = useNavigate();
    
    const features = [
        {
            icon: <Book className="w-10 h-10 text-blue-500" />,
            title: 'Comprehensive Courses',
            description: 'Access a wide range of expert-curated courses across multiple disciplines.'
        },
        {
            icon: <Globe className="w-10 h-10 text-green-500" />,
            title: 'Global Learning',
            description: 'Connect with top instructors and students from around the world.'
        },
        {
            icon: <Video className="w-10 h-10 text-purple-500" />,
            title: 'Interactive Content',
            description: 'Engage with high-quality video lectures, quizzes, and hands-on projects.'
        }
    ];

    const courseCategories = [
        { name: 'Technology', count: 45 },
        { name: 'Business', count: 32 },
        { name: 'Design', count: 28 },
        { name: 'Data Science', count: 22 }
    ];

    return (
        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
           
            <Nav />

           
            <header className="relative pt-24 pb-12 px-9 sm:px-6 lg:px-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-7 lg:ml-10">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                            Transform Your Skills <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                Learn Anywhere, Anytime
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                            Discover a world of knowledge with expert-led courses, interactive learning, and personalized educational experiences.
                        </p>
                        <div className="flex space-x-4">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg">
                                <span>Explore Courses</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button onClick={()=>navigate('/userlist')} className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-gray-50 transition-all duration-300 shadow-md">
                                <ArrowRight className="w-6 h-6 text-blue-500" />
                                <span>ALL Users</span>
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <img 
                            src="./src/assets/image.png"   
                            alt="Learning Platform" 
                            className="rounded-2xl shadow-2xl w-5/6  transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </header>

          
            <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
                            Why Choose LearnYard?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Our platform is designed to provide a seamless, engaging, and personalized learning experience.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl space-y-4 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                            >
                                {feature.icon}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

          
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
                            Explore Course Categories
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {courseCategories.map((category, index) => (
                            <div 
                                key={index} 
                                className="bg-white dark:bg-gray-900 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer"
                            >
                                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
                                    {category.count}+
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {category.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r dark:bg-gray-800">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-white mb-6">
                        Start Your Learning Journey Today
                    </h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        Join thousands of learners transforming their lives through education.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-xl">
                        Create Free Account
                    </button>
                </div>
            </section>

           
            <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                            LearnYard
                        </div>
                        <p className="text-gray-400">
                            Empowering learners through innovative online education.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <nav className="space-y-2">
                            <a href="#" className="text-gray-400 hover:text-white">Courses</a>
                            <a href="#" className="text-gray-400 hover:text-white">Instructors</a>
                            <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                        </nav>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Community</h4>
                        <nav className="space-y-2">
                            <a href="#" className="text-gray-400 hover:text-white">Blog</a>
                            <a href="#" className="text-gray-400 hover:text-white">Forum</a>
                            <a href="#" className="text-gray-400 hover:text-white">Events</a>
                        </nav>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <nav className="space-y-2">
                            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                            <a href="#" className="text-gray-400 hover:text-white">Support</a>
                            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EdTechLandingPage;