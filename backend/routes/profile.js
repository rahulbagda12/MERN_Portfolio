const express = require('express');
const multer = require('multer');
const path = require('path');
const Profile = require('../models/Profile');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get profile (Public)
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or Update profile (Admin only)
router.post('/', adminAuth, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    const profileData = { ...req.body };
    
    if (req.files?.avatar) {
      profileData.avatar = `/uploads/${req.files.avatar[0].filename}`;
    }
    if (req.files?.resume) {
      profileData.resume = `/uploads/${req.files.resume[0].filename}`;
    }

    // Parse socialLinks if it's a string
    if (typeof profileData.socialLinks === 'string') {
      profileData.socialLinks = JSON.parse(profileData.socialLinks);
    }

    // Parse heroTaglines if it's a string
    if (typeof profileData.heroTaglines === 'string') {
      profileData.heroTaglines = JSON.parse(profileData.heroTaglines);
    }

    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, profileData, { new: true });
    } else {
      profile = new Profile(profileData);
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update profile (Admin only)
router.put('/', adminAuth, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    const profileData = { ...req.body };
    
    if (req.files?.avatar) {
      profileData.avatar = `/uploads/${req.files.avatar[0].filename}`;
    }
    if (req.files?.resume) {
      profileData.resume = `/uploads/${req.files.resume[0].filename}`;
    }

    // Parse socialLinks if it's a string
    if (typeof profileData.socialLinks === 'string') {
      profileData.socialLinks = JSON.parse(profileData.socialLinks);
    }

    // Parse heroTaglines if it's a string
    if (typeof profileData.heroTaglines === 'string') {
      profileData.heroTaglines = JSON.parse(profileData.heroTaglines);
    }

    const profile = await Profile.findOneAndUpdate({}, profileData, { new: true, upsert: true });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
