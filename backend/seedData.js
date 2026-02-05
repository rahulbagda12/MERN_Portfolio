const mongoose = require('mongoose');
require('dotenv').config();

const Profile = require('./models/Profile');
const Education = require('./models/Education');
const Experience = require('./models/Experience');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

// Profile Data
const profileData = {
  name: 'Rahul Bagda',
  title: 'Tech Educator | MERN Stack Developer & Teaching Assistant',
  bio: 'Tech Educator at ATMIYA University specializing in Practical FullStack Development & Modern Web Architecture. Motivated and tech-savvy individual eager to collaborate with innovative organizations.',
  email: 'rahulbagda09@gmail.com',
  phone: '+91-8145828474',
  location: '05 Street, Ambedkar Nagar, Kalawad Road, Rajkot',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/rahulbagda1212/',
    github: '',
    twitter: '',
    instagram: '',
    facebook: '',
    website: ''
  },
  heroTaglines: [
    'Tech Educator',
    'MERN Stack Developer',
    'Teaching Assistant',
    'Full Stack Developer'
  ],
  aboutMe: 'ATMIYA UNIVERSITY has provided an opportunity to support academic programs as a Teaching Assistant. The role focuses on mentoring students and contributing to the learning environment, leveraging expertise in web technologies. Previous experience as a MERN Stack Developer Intern at Imbuesoft enhanced skills in application development and event monitoring. A solid academic foundation in computer science and hands-on certifications, such as Android application development, reinforce a commitment to innovation in technology.'
};

// Education Data
const educationData = [
  {
    institution: 'Atmiya Institute of Technology & Science',
    degree: 'Master of Computer Applications - MCA',
    field: 'Computer Science',
    description: 'Completed MCA with focus on advanced software development, cloud technologies, and IoT systems.',
    location: 'Rajkot',
    startDate: new Date('2023-08-01'),
    endDate: new Date('2025-05-31'),
    current: false,
    order: 1
  },
  {
    institution: 'T.N.RAO INSTITUTE OF MANAGEMENT RESEARCH & TECHNOLOGY & B.ED.COLLEGE-RAJKOT',
    degree: 'Bachelor of Computer Application',
    field: 'Information Technology',
    description: 'Completed BCA with comprehensive study of programming, databases, and web technologies.',
    gpa: '85.78%',
    location: 'Rajkot',
    startDate: new Date('2021-07-01'),
    endDate: new Date('2023-05-31'),
    current: false,
    order: 2
  }
];

// Experience Data
const experienceData = [
  {
    company: 'ATMIYA UNIVERSITY',
    position: 'Teaching Assistant',
    description: 'Supporting academic programs by mentoring students and contributing to the learning environment, leveraging expertise in web technologies.',
    responsibilities: [
      'Mentoring students and contributing to the learning environment.',
      'Leveraging expertise in web technologies to support academic programs.',
      'Specializing in Practical FullStack Development & Modern Web Architecture.'
    ],
    technologies: ['Web Technologies', 'FullStack Development', 'Modern Web Architecture'],
    location: 'Rajkot, Gujarat, India',
    startDate: new Date('2025-07-01'),
    current: true,
    order: 1
  },
  {
    company: 'Imbuesoft',
    position: 'Intern Mern Stack Developer',
    description: 'Enhanced skills in application development and event monitoring. Worked on full-stack web development using MERN stack.',
    responsibilities: [
      'Enhanced skills in application development and event monitoring.',
      'Worked on full-stack web development using MongoDB, Express, React, and Node.js.',
      'Contributed to real-world projects and gained hands-on experience in modern web technologies.'
    ],
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Event Monitoring'],
    location: 'Rajkot, Gujarat, India',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2025-11-30'),
    current: false,
    order: 2
  }
];

// Projects Data
const projectsData = [
  {
    title: 'Environmental Monitoring System (IoT)',
    description: 'IoT-based system for real-time environmental data tracking using Raspberry Pi and Python.',
    longDescription: 'Developed using Raspberry Pi and Python for real-time environmental data tracking. The system monitors temperature, humidity, air quality, and other environmental parameters, providing real-time alerts and data visualization.',
    technologies: ['Raspberry Pi', 'Python', 'IoT', 'Sensors'],
    category: 'other',
    featured: true,
    status: 'completed',
    order: 1
  },
  {
    title: 'Central Event Notification App',
    description: 'Android application designed for streamlined event notifications during hackathons.',
    longDescription: 'Built an Android app during a hackathon to streamline event notifications. The app provides real-time updates, event schedules, and notifications to participants, ensuring they never miss important announcements.',
    technologies: ['Android', 'Java', 'Firebase'],
    category: 'mobile',
    featured: true,
    status: 'completed',
    order: 2
  },
  {
    title: 'Self Driving Car Simulation',
    description: 'Python and OpenCV-based simulation project for autonomous car functionalities.',
    longDescription: 'Created a Python & OpenCV-based simulation project for autonomous car functionalities. The simulation includes lane detection, object recognition, and basic navigation algorithms.',
    technologies: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
    category: 'other',
    featured: true,
    status: 'completed',
    order: 3
  }
];

// Skills Data
const skillsData = [
  // Programming Languages
  { name: 'Python', category: 'backend', proficiency: 85, order: 1 },
  { name: 'PHP', category: 'backend', proficiency: 75, order: 2 },
  { name: 'C', category: 'other', proficiency: 70, order: 3 },
  { name: 'JavaScript', category: 'frontend', proficiency: 80, order: 4 },

  // Web Development
  { name: 'HTML', category: 'frontend', proficiency: 95, order: 5 },
  { name: 'CSS', category: 'frontend', proficiency: 95, order: 6 },
  { name: 'WordPress', category: 'other', proficiency: 80, order: 7 },
  { name: 'ASP.NET', category: 'backend', proficiency: 70, order: 8 },

  // Frameworks
  { name: 'Node.js', category: 'backend', proficiency: 85, order: 9 },
  { name: 'Express.js', category: 'backend', proficiency: 85, order: 10 },
  { name: 'React', category: 'frontend', proficiency: 85, order: 11 },
  { name: 'Bootstrap', category: 'frontend', proficiency: 90, order: 12 },
  { name: 'ASP.NET MVC', category: 'backend', proficiency: 70, order: 13 },

  // Technologies
  { name: 'AWS', category: 'devops', proficiency: 60, order: 14 },
  { name: 'VERCEL', category: 'devops', proficiency: 60, order: 14 },
  { name: 'OpenCV', category: 'other', proficiency: 75, order: 15 },
  { name: 'Raspberry Pi', category: 'other', proficiency: 70, order: 16 },

  // Database
  { name: 'MongoDB', category: 'database', proficiency: 85, order: 17 },
  { name: 'MySQL', category: 'database', proficiency: 75, order: 18 },

  // Mobile & IoT
  { name: 'Android Development', category: 'mobile', proficiency: 75, order: 19 },
  { name: 'IoT Systems', category: 'other', proficiency: 70, order: 20 },

  // Additional Skills
  { name: 'Event Monitoring', category: 'other', proficiency: 85, order: 21 },
  { name: 'CarSim', category: 'other', proficiency: 75, order: 22 }
];

// Seed function
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Profile.deleteMany({});
    await Education.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});

    console.log('Cleared existing data');

    // Insert new data
    await Profile.create(profileData);
    console.log('Profile data inserted');

    await Education.insertMany(educationData);
    console.log('Education data inserted');

    await Experience.insertMany(experienceData);
    console.log('Experience data inserted');

    await Project.insertMany(projectsData);
    console.log('Projects data inserted');

    await Skill.insertMany(skillsData);
    console.log('Skills data inserted');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed function
seedDatabase();
