const express = require('express');
const Contact = require('../models/Contact');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Submit contact form (Public)
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: 'Message sent successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all contact messages (Admin only)
router.get('/', adminAuth, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single contact message (Admin only)
router.get('/:id', adminAuth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact message not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Mark as read (Admin only)
router.put('/:id/read', adminAuth, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Contact message not found' });
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete contact message (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact message not found' });
        }
        res.json({ message: 'Contact message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
