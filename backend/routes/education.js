const express = require('express');
const Education = require('../models/Education');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all education (Public)
router.get('/', async (req, res) => {
    try {
        const education = await Education.find().sort({ startDate: -1 });
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single education (Public)
router.get('/:id', async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create education (Admin only)
router.post('/', adminAuth, async (req, res) => {
    try {
        const educationData = { ...req.body };

        // Parse achievements if it's a string
        if (typeof educationData.achievements === 'string') {
            educationData.achievements = JSON.parse(educationData.achievements);
        }

        const education = new Education(educationData);
        await education.save();
        res.status(201).json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update education (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const educationData = { ...req.body };

        // Parse achievements if it's a string
        if (typeof educationData.achievements === 'string') {
            educationData.achievements = JSON.parse(educationData.achievements);
        }

        const education = await Education.findByIdAndUpdate(
            req.params.id,
            educationData,
            { new: true }
        );

        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }

        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete education (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);
        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.json({ message: 'Education deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
