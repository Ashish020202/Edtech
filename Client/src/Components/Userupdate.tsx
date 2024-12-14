import React, { useState, useEffect } from 'react';
import { 
    User as UserIcon, 
    Mail,  
    GraduationCap, 
    Briefcase,
    Save,
} from 'lucide-react';
import { Userapi } from '../api/auth';
import { useParams } from 'react-router';

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




const UpdateUserProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<Role>('student');
    const [profile, setProfile] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await Userapi.get(`/users/${id}`);
                const userData = response.data;
                
                
                setUser(userData);
                setEmail(userData.email);
                setRole(userData.role);
                setProfile(userData.profile || {});
            } catch (err) {
                setError('Failed to fetch user data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateData = {
            email,
            role,
            profile
        };

        try {
            const response = await Userapi.put(`/users/${id}`, updateData);
            alert('Profile updated successfully');
            setUser(response.data);
        } catch (err) {
            setError('Failed to update profile');
            console.error(err);
        }
    };

    const handleRoleChange = (newRole: Role) => {
        setRole(newRole);
        setProfile({});
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Update Profile
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Edit your account details
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Select Role
                            </label>
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => handleRoleChange('student')}
                                    disabled={isLoading}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-300 ${
                                        role === 'student' 
                                            ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700' 
                                            : 'text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <GraduationCap className="w-5 h-5" />
                                    <span>Student</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRoleChange('teacher')}
                                    disabled={isLoading}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-300 ${
                                        role === 'teacher' 
                                            ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700' 
                                            : 'text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <Briefcase className="w-5 h-5" />
                                    <span>Teacher</span>
                                </button>
                            </div>
                        </div>

                        {role === 'teacher' && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={profile.name || ''}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        value={profile.subject || ''}
                                        onChange={(e) => setProfile({ ...profile, subject: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="Years of Experience"
                                        value={profile.experience || ''}
                                        onChange={(e) => setProfile({ ...profile, experience: +e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>
                        )}

                        {role === 'student' && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={profile.name || ''}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Grade/Year"
                                        value={profile.grade || ''}
                                        onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        <span>Update Profile</span>
                    </button>
                </form>

                {error && (
                    <div className="mt-4 text-center text-red-500">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateUserProfile;