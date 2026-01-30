const express = require('express');
const Skill = require('../models/Skill');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all skills (Public)
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1, createdAt: -1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single skill (Public)
router.get('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create skill (Admin only)
router.post('/', adminAuth, async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update skill (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete skill (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
