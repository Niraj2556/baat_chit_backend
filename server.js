import VideoCallApp from './src/app.js';
import mongoose from 'mongoose';

let appInstance;

export default async function handler(req, res) {
    if (!appInstance) {
        appInstance = new VideoCallApp();
        
        // Connect to MongoDB
        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://nirajgupta54180_db_user:idxfjMZxQTJmhdMc@cluster0.mfjynmk.mongodb.net/videochat?retryWrites=true&w=majority&appName=Cluster0';
            await mongoose.connect(mongoUri);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Database connection failed:', error);
        }
    }
    
    // Handle Socket.IO upgrade
    if (req.url?.startsWith('/socket.io/')) {
        if (!res.socket.server.io) {
            appInstance.setupSocketIO();
            res.socket.server.io = appInstance.io;
        }
        return appInstance.io.engine.handleRequest(req, res);
    }
    
    // Handle regular HTTP requests
    return appInstance.app(req, res);
}

// For local development
if (process.env.NODE_ENV !== 'production') {
    const app = new VideoCallApp();
    app.start();
}