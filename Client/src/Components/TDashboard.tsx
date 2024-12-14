import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
    Book, 
    Users, 
    BarChart2, 
    Calendar, 
    MessageCircle, 
    Settings, 
    Bell, 
    Plus, 
    FileText, 
} from 'lucide-react';


const TeacherDashboard: React.FC = () => {
    const [activeSection, setActiveSection] = useState('courses');

    const navigate = useNavigate();

    const courses = [
        {
            id: 1,
            title: 'Web Development Masterclass',
            students: 342,
            progress: 75,
            lastUpdated: '2 days ago'
        },
        {
            id: 2,
            title: 'Python for Beginners',
            students: 201,
            progress: 60,
            lastUpdated: '1 week ago'
        },
        {
            id: 3,
            title: 'Advanced JavaScript Techniques',
            students: 156,
            progress: 45,
            lastUpdated: '3 days ago'
        }
    ];

    const recentActivities = [
        {
            icon: <Users className="text-blue-500" />,
            title: '25 New Enrollments',
            description: 'Across your courses this week',
            time: '2 hours ago'
        },
        {
            icon: <FileText className="text-green-500" />,
            title: 'Assignment Submissions',
            description: '42 assignments reviewed',
            time: '1 day ago'
        },
        {
            icon: <MessageCircle className="text-purple-500" />,
            title: 'New Discussion',
            description: 'Student question in Web Dev course',
            time: '3 hours ago'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 flex"> 
            <div className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 p-6 space-y-6">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-8">
                    LearnYard
                </div>

                <nav className="space-y-2">
                    {[
                        { icon: <Book className="w-5 h-5" />, name: 'Courses', section: 'courses' },
                        { icon: <Users className="w-5 h-5" />, name: 'Students', section: 'students' },
                        { icon: <BarChart2 className="w-5 h-5" />, name: 'Analytics', section: 'analytics' },
                        { icon: <Calendar className="w-5 h-5" />, name: 'Schedule', section: 'schedule' },
                        { icon: <MessageCircle className="w-5 h-5" />, name: 'Messages', section: 'messages' },
                        { icon: <Settings className="w-5 h-5" />, name: 'Settings', section: 'settings' }
                    ].map((item) => (
                        <button
                            key={item.section}
                            onClick={() => setActiveSection(item.section)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                                activeSection === item.section 
                                    ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400' 
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            
            <div className="flex-1 p-8">
               
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome, Professor 
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Here's an overview of your courses and activities
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg" onClick={()=>navigate('/userlist')}>
                            View All Users
                        </button>
                           
                        </div>
                        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                            <Plus className="w-6 h-6" />
                        </button>
                        <button className="relative">
                            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                                3
                            </span>
                        </button>
                    </div>
                </header>

               
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Your Courses
                        </h2>
                        <button className="text-blue-600 hover:underline">
                            View All
                        </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div 
                                key={course.id} 
                                className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-6 space-y-4 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {course.title}
                                    </h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Updated {course.lastUpdated}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Users className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    <span className="text-sm text-gray-700 dark:text-gray-200">
                                        {course.students} Students
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div 
                                        className="bg-blue-600 h-2.5 rounded-full" 
                                        style={{width: `${course.progress}%`}}
                                    ></div>
                                </div>
                                <div className="flex justify-between">
                                    <button className="text-blue-600 hover:underline text-sm">
                                        Manage Course
                                    </button>
                                    <button className="text-green-600 hover:underline text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

               
                <section className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Recent Activities
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div 
                                key={index} 
                                className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                                        {activity.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                            {activity.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {activity.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherDashboard;