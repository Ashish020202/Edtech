import React, { useEffect, useState } from 'react';
import { 
    Users, 
    UserCircle, 
    UserCheck, 
    UserX, 
    Search, 
    Plus, 
    Bell 
} from 'lucide-react';
import { Userapi } from '../api/auth';
import { useNavigate } from 'react-router';



export type Role = 'teacher' | 'student';

export interface TeacherProfile {
    name: string;
    subject: string;
    experience: number;
}

export interface StudentProfile {
    name: string;
    grade: string;
    enrolledCourses: string[];
}

export interface User {
    _id?: string;
    email: string;
    password?: string;
    role: Role;
    profile?: TeacherProfile | StudentProfile;
}

const UserList: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await Userapi.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await Userapi.delete(`/users/${id}`);
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete the user. Please try again.');
            }
        }
    };

    

    const filteredUsers = users.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.profile && 'name' in user.profile && 
         user.profile.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getUserDisplayName = (user: User): string => {
        if (user.profile && 'name' in user.profile) {
            return user.profile.name;
        }
        return user.email;
    };

    const getUserProfileDetails = (user: User): string => {
        if (user.role === 'teacher' && user.profile && 'subject' in user.profile) {
            return `Subject: ${user.profile.subject}`;
        }
        if (user.role === 'student' && user.profile && 'grade' in user.profile) {
            return `Grade: ${user.profile.grade}`;
        }
        return '';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 p-6 space-y-6">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-8">
                    UserHub
                </div>

                <nav className="space-y-2">
                    {[
                        { icon: <Users className="w-5 h-5" />, name: 'User List', section: 'users' },
                        { icon: <UserCircle className="w-5 h-5" />, name: 'Profile', section: 'profile' },
                        { icon: <UserCheck className="w-5 h-5" />, name: 'Active Users', section: 'active' },
                        { icon: <UserX className="w-5 h-5" />, name: 'Inactive Users', section: 'inactive' }
                    ].map((item) => (
                        <button
                            key={item.section}
                            className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                        >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            User Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Overview of all registered users
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search users..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

                {/* Users Overview */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            User List
                        </h2>
                        <span className="text-gray-600 dark:text-gray-300">
                            Total Users: {users.length}
                        </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredUsers.map((user) => (
                            <div 
                                key={user._id} 
                                className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-6 space-y-4 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {getUserDisplayName(user)}
                                    </h3>
                                    <span className={`text-sm font-medium ${
                                        user.role === 'teacher' ? 'text-blue-600' : 'text-green-600'
                                    }`}>
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {user.email}
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        {getUserProfileDetails(user)}
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button 
                                        onClick={()=>navigate(`/updateuser/${user._id}`)}
                                        className="text-green-600 hover:underline text-sm"
                                    >
                                        Update User
                                    </button>
                                    <button onClick={() => handleDeleteUser(user._id!)}

                                        className="text-red-600 hover:underline text-sm"
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UserList;