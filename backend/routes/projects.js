const express = require('express');
const multer = require('multer');
const Project = require('../models/Project');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Multer configuration for project images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single project (Public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create project (Admin only)
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    
    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }

    // Parse arrays if they're strings
    if (typeof projectData.technologies === 'string') {
      projectData.technologies = JSON.parse(projectData.technologies);
    }
    if (typeof projectData.features === 'string') {
      projectData.features = JSON.parse(projectData.features);
    }

    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update project (Admin only)
router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    
    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }

    // Parse arrays if they're strings
    if (typeof projectData.technologies === 'string') {
      projectData.technologies = JSON.parse(projectData.technologies);
    }
    if (typeof projectData.features === 'string') {
      projectData.features = JSON.parse(projectData.features);
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete project (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
