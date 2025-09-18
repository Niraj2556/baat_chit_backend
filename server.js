import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './src/routes/auth.js';

const app = express();

// Connect to MongoDB
if (!mongoose.connection.readyState) {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://nirajgupta54180_db_user:idxfjMZxQTJmhdMc@cluster0.mfjynmk.mongodb.net/videochat?retryWrites=true&w=majority&appName=Cluster0';
    mongoose.connect(mongoUri).catch(console.error);
}

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://baat-chit-fronted.vercel.app',
    credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Baat Chit Backend is running' });
});

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

export default app;