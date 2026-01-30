const express = require('express');
const Experience = require('../models/Experience');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all experiences (Public)
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single experience (Public)
router.get('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create experience (Admin only)
router.post('/', adminAuth, async (req, res) => {
    try {
        const experienceData = { ...req.body };

        // Parse responsibilities if it's a string
        if (typeof experienceData.responsibilities === 'string') {
            experienceData.responsibilities = JSON.parse(experienceData.responsibilities);
        }

        const experience = new Experience(experienceData);
        await experience.save();
        res.status(201).json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update experience (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const experienceData = { ...req.body };

        // Parse responsibilities if it's a string
        if (typeof experienceData.responsibilities === 'string') {
            experienceData.responsibilities = JSON.parse(experienceData.responsibilities);
        }

        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            experienceData,
            { new: true }
        );

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete experience (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
