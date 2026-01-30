const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  resume: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  socialLinks: {
    linkedin: { type: String, default: 'https://www.linkedin.com/in/rahulbagda1212/' },
    github: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    website: { type: String, default: '' }
  },
  heroTaglines: [{
    type: String
  }],
  aboutMe: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
