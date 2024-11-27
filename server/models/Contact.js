const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    contactId: { type: String, unique: true },
});

module.exports = mongoose.model('Contact', contactSchema);
