import React, { useState } from 'react';
import { 
    Lock, 
    Mail, 
    Eye, 
    EyeOff, 
    ArrowRight, 
    UserCircle,
    ShieldCheck
} from 'lucide-react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateForm = () => {
       
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }

        
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

      
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

       
        if (!validateForm()) {
            return;
        }

        try {
            await signup({ 
                email, 
                password, 
                role 
            });
            
            
            navigate('/login');
        } catch (err: any) {
            
            setError(err.response?.data?.error || 'Signup failed');
            console.error('Signup error:', err);
        }
    };

    const toggleRole = () => {
        setRole(prevRole => prevRole === 'student' ? 'teacher' : 'student');
        
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-10 border border-gray-100 dark:border-gray-800">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                        LearnHub
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Sign up as {role === 'student' ? 'Student' : 'Teacher'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="text-gray-400 h-5 w-5" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="text-gray-400 h-5 w-5" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="text-gray-400 h-5 w-5" />
                            </div>
                            <input
                                id="confirm-password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10 block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            onClick={toggleRole}
                            className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            {role === 'student' ? (
                                <>
                                    <ShieldCheck className="mr-2 h-5 w-5" />
                                    Switch to Teacher Signup
                                </>
                            ) : (
                                <>
                                    <UserCircle className="mr-2 h-5 w-5" />
                                    Switch to Student Signup
                                </>
                            )}
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold transition-all duration-300"
                        >
                            Sign Up as {role === 'student' ? 'Student' : 'Teacher'}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <button 
                            onClick={() => navigate('/login')}
                            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;