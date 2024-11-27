const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

const contactRoutes = require('./routes/contactRoutes');
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/contacts', contactRoutes);
app.use('/api/chats', chatRoutes);

io.on('connection', (socket) => {
    console.log('User connected');
    
   
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
