const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contacts' });
    }
});

module.exports = router;
