import { Server } from 'socket.io';
import SocketHandler from '../src/handlers/socketHandler.js';

let io;

export default function handler(req, res) {
    if (!res.socket.server.io) {
        console.log('Setting up Socket.IO server...');
        io = new Server(res.socket.server, {
            path: '/socket.io/',
            cors: {
                origin: process.env.CORS_ORIGIN || "*",
                methods: ["GET", "POST"]
            },
            transports: ['websocket', 'polling'],
            allowEIO3: true
        });
        
        const socketHandler = new SocketHandler(io);
        socketHandler.initialize();
        
        res.socket.server.io = io;
    }
    
    res.end();
}