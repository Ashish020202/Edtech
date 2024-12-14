import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'teacher' | 'student';
    profile: ITeacherProfile | IStudentProfile;
}

interface ITeacherProfile {
    name: string;
    subject: string;
    experience: number; // years of teaching experience
}

interface IStudentProfile {
    name: string;
    grade: string; // e.g., 'Grade 10'
    enrolledCourses: string[];
}

const TeacherProfileSchema = new Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    experience: { type: Number, required: true },
});

const StudentProfileSchema = new Schema({
    name: { type: String, required: true },
    grade: { type: String, required: true },
    enrolledCourses: { type: [String], default: [] },
});

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'student'], required: true },
    profile: { type: Schema.Types.Mixed, required: false },
});

export default mongoose.model<IUser>('User', UserSchema);
