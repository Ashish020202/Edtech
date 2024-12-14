import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './Routes/authRoutes';

dotenv.config();


const MONGO_URI = process.env.MONGO_URI||'';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;
