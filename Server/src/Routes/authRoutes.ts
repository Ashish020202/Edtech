import express from 'express';
import { signup, login } from '../Controller/AuthController';
import { authenticate, authorize } from '../Middleware/Middleware';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../Controller/UserController';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/teacher', authenticate, authorize(['teacher']), (req, res) => {
    res.status(200).json({ message: 'Welcome!' });
});

router.get('/student', authenticate, authorize(['student', 'teacher']), (req, res) => {
    res.status(200).json({ message: 'Welcome, User!' });
});

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
