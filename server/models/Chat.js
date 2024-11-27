const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    contactId: String,
    messages: [
        {
            text: String,
            sender: String,
            timestamp: { type: Date, default: Date.now },
        }
    ]
});

module.exports = mongoose.model('Chat', chatSchema);
