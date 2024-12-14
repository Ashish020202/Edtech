import React, { useState } from 'react';
import { 
    Book, 
    BarChart2, 
    Calendar, 
    MessageCircle, 
    Settings, 
    Bell, 
    FileText, 
    Video, 
    CheckCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router';

const StudentDashboard: React.FC = () => {
    const [activeSection, setActiveSection] = useState('courses');

    const navigate = useNavigate();

    const courses = [
        {
            id: 1,
            title: 'Web Development Masterclass',
            instructor: 'Prof. Emily Chen',
            progress: 75,
            assignments: 3,
            nextClass: 'Tomorrow at 10:00 AM'
        },
        {
            id: 2,
            title: 'Python for Beginners',
            instructor: 'Dr. Michael Rodriguez',
            progress: 60,
            assignments: 2,
            nextClass: 'Thursday at 2:00 PM'
        },
        {
            id: 3,
            title: 'Advanced JavaScript Techniques',
            instructor: 'Prof. Sarah Kim',
            progress: 45,
            assignments: 1,
            nextClass: 'Friday at 11:30 AM'
        }
    ];

    const upcomingAssignments = [
        {
            icon: <FileText className="text-blue-500" />,
            title: 'Web Dev Project Submission',
            course: 'Web Development Masterclass',
            dueDate: 'Due in 3 days',
            status: 'Pending'
        },
        {
            icon: <Video className="text-green-500" />,
            title: 'Python Programming Quiz',
            course: 'Python for Beginners',
            dueDate: 'Due in 5 days',
            status: 'Not Started'
        },
        {
            icon: <CheckCircle className="text-purple-500" />,
            title: 'JavaScript Coding Challenge',
            course: 'Advanced JavaScript Techniques',
            dueDate: 'Due in 7 days',
            status: 'In Progress'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 p-6 space-y-6">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-8">
                    LearnHub
                </div>

                <nav className="space-y-2">
                    {[
                        { icon: <Book className="w-5 h-5" />, name: 'My Courses', section: 'courses' },
                        { icon: <FileText className="w-5 h-5" />, name: 'Assignments', section: 'assignments' },
                        { icon: <BarChart2 className="w-5 h-5" />, name: 'Grades', section: 'grades' },
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
                            Welcome
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Your learning journey continues today
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg" onClick={()=>navigate('/userlist')}>
                            View All Users
                        </button>
                        </div>
                        <button className="relative">
                            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                                4
                            </span>
                        </button>
                    </div>
                </header>

               
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            My Courses
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
                                        {course.instructor}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    <span className="text-sm text-gray-700 dark:text-gray-200">
                                        Next class: {course.nextClass}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div 
                                        className="bg-blue-600 h-2.5 rounded-full" 
                                        style={{width: `${course.progress}%`}}
                                    ></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <FileText className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                        <span className="text-sm text-gray-700 dark:text-gray-200">
                                            {course.assignments} Assignments
                                        </span>
                                    </div>
                                    <button className="text-blue-600 hover:underline text-sm">
                                        Course Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

               
                <section className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Upcoming Assignments
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {upcomingAssignments.map((assignment, index) => (
                            <div 
                                key={index} 
                                className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                                        {assignment.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                            {assignment.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {assignment.course}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {assignment.dueDate}
                                    </span>
                                    <span className={`text-sm font-medium ${
                                        assignment.status === 'Pending' ? 'text-yellow-600' :
                                        assignment.status === 'Not Started' ? 'text-red-600' :
                                        'text-green-600'
                                    }`}>
                                        {assignment.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StudentDashboard;