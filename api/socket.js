import { Server } from 'socket.io';
import SocketHandler from '../src/handlers/socketHandler.js';

export default function handler(req, res) {
    // Set CORS headers
    const origin = process.env.CORS_ORIGIN || 'https://baat-chit-fronted.vercel.app';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            cors: {
                origin: origin,
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        
        const socketHandler = new SocketHandler(io);
        socketHandler.initialize();
        
        res.socket.server.io = io;
    }
    
    res.socket.server.io.engine.handleRequest(req, res);
}