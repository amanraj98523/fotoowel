import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect('http://localhost:5000');

const ChatWindow = () => {
  const { contactId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    axios.get(`/api/chats/${contactId}`).then((response) => {
      setMessages(response.data.messages);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [contactId]);

  const sendMessage = () => {
    const message = {
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    socket.emit('sendMessage', message); 
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
  };

  return (
    <div className="chat-window">
      <h3>Chat with {contactId}</h3>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
