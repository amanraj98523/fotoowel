const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

router.get('/:contactId', async (req, res) => {
    try {
        const chat = await Chat.findOne({ contactId: req.params.contactId });
        res.json(chat);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching chat messages' });
    }
});

module.exports = router;
