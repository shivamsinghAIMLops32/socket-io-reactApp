import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// instance variables configuration
const app = express();
const server  = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: 'http://localhost:5173/', // client url
        methods: ['GET', 'POST', 'PUT'],
        credentials: true
    }
});


// middleware

app.use(express.json());
app.use(cors());

// socket listner
io.on('connection',(socket)=>{
    console.log(`a new user connected ${socket.id}`);

    // receive message from client
    socket.on('message',(message)=>{
        console.log(`received message: ${message}`);
        io.emit('message',message);
    });
    
    // disconnect event
    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`);
    });

})





// server listening

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));