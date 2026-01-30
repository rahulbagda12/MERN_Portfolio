const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'api', 'other'],
    default: 'web'
  },
  liveUrl: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
