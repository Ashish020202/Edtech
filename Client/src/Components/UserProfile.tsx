import React, { useState, useEffect } from 'react';
import { User, Save, Trash2 } from 'lucide-react';

// TypeScript interfaces for type safety
interface TeacherProfile {
    firstName: string;
    lastName: string;
    subjects: string[];
    qualifications: string[];
    bio?: string;
    yearsOfExperience?: number;
    institution?: string;
}

interface StudentProfile {
    firstName: string;
    lastName: string;
    grade?: number;
    interests?: string[];
    academicBackground?: string;
    guardianContact?: {
        name: string;
        relationship: string;
        email?: string;
        phone?: string;
    };
}

interface UserProfileProps {
    initialProfile: TeacherProfile | StudentProfile;
    role: 'teacher' | 'student';
    onSave: (profile: TeacherProfile | StudentProfile) => void;
}

const UserProfileComponent: React.FC<UserProfileProps> = ({ 
    initialProfile, 
    role, 
    onSave 
}) => {
    const [profile, setProfile] = useState(initialProfile);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleArrayChange = (field: string, values: string[]) => {
        setProfile(prev => ({
            ...prev,
            [field]: values
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(profile);
        setIsEditing(false);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {role === 'teacher' ? 'Teacher' : 'Student'} Profile
                </h2>
                {!isEditing ? (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        {/* <UserEdit className="h-6 w-6" /> */}
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button 
                            onClick={handleSubmit}
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                        >
                            <Save className="h-6 w-6" />
                        </button>
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                            <Trash2 className="h-6 w-6" />
                        </button>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {role === 'teacher' ? (
                    // Teacher Profile Fields
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                value={(profile as TeacherProfile).firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                disabled={!isEditing}
                                className="w-full p-2 border rounded dark:bg-gray-700"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={(profile as TeacherProfile).lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                disabled={!isEditing}
                                className="w-full p-2 border rounded dark:bg-gray-700"
                            />
                        </div>
                        {/* Additional Teacher-specific fields */}
                    </>
                ) : (
                    // Student Profile Fields
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                value={(profile as StudentProfile).firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                disabled={!isEditing}
                                className="w-full p-2 border rounded dark:bg-gray-700"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={(profile as StudentProfile).lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                disabled={!isEditing}
                                className="w-full p-2 border rounded dark:bg-gray-700"
                            />
                        </div>
                        {/* Additional Student-specific fields */}
                    </>
                )}
            </form>
        </div>
    );
};

export default UserProfileComponent;