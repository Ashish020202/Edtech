import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../Models/UserModel';

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export const signup = async (req: any, res: any) => {
    const { email, password, role } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        // Validate role
        if (!['student', 'teacher'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ 
            email, 
            password: hashedPassword, 
            role 
        });

        await newUser.save();

        res.status(201).json({ 
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} created successfully!` 
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const login = async (req: any, res: any) => {
    const { email, password, role } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

        // Verify role
        if (user.role !== role) {
            return res.status(403).json({ 
                error: `Invalid role. You're trying to log in as ${role}, but this account is a ${user.role}.` 
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            token, 
            role: user.role 
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};