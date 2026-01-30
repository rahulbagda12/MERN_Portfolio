# Seed Data Documentation

This document explains how to populate your portfolio database with the data from your resume.

## What's Included

The `seedData.js` file contains all the information from your resume:

### Profile Information
- Name: Rahul Bagda
- Email: rahulbagda094@gmail.com
- Phone: +91-8145828474
- Location: 05 Street, Ambedkar Nagar, Kalawad Road, Rajkot
- Social Links (LinkedIn)

### Education
1. **Master of Computer Application** - Atmiya University, Rajkot (Pursuing)
2. **Bachelor of Computer Application** - T.N. Rao College, Rajkot (85.78%)

### Experience
1. **Backend Intern** at IMBUESOFTLE, Rajkot (Dec 2024 - Present)
   - Backend Development with Node.js and Express
   - Database Management with MongoDB
   - RESTful API Integration

### Projects
1. **Environmental Monitoring System (IoT)** - Raspberry Pi and Python
2. **Central Event Notification App** - Android application
3. **Self Driving Car Simulation** - Python and OpenCV

### Skills
**Programming Languages:**
- Python, PHP, C, JavaScript

**Web Development:**
- HTML, CSS, WordPress, ASP.NET

**Frameworks:**
- Node.js, Express.js, React, Bootstrap, ASP.NET MVC

**Technologies:**
- AWS, OpenCV, Raspberry Pi

**Database:**
- MongoDB, MySQL

**Mobile & IoT:**
- Android Development, IoT Systems

## How to Use

### Prerequisites
Make sure you have:
1. MongoDB installed and running
2. Node.js installed
3. All backend dependencies installed (`npm install` in the backend folder)
4. A `.env` file with `MONGODB_URI` (optional, defaults to `mongodb://localhost:27017/portfolio`)

### Running the Seed Script

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the seed script:
   ```bash
   node seedData.js
   ```

3. You should see output like:
   ```
   Connected to MongoDB
   Cleared existing data
   Profile data inserted
   Education data inserted
   Experience data inserted
   Projects data inserted
   Skills data inserted
   Database seeded successfully!
   ```

### Important Notes

- **WARNING**: This script will delete all existing data in the following collections:
  - Profile
  - Education
  - Experience
  - Project
  - Skill

- Run this script only when you want to reset your database with fresh data
- Make sure to backup any existing data before running this script

### Verifying the Data

After running the seed script, you can:
1. Start your backend server (`npm start` or `node server.js`)
2. Check the API endpoints:
   - GET `/api/profile` - View profile data
   - GET `/api/education` - View education data
   - GET `/api/experience` - View experience data
   - GET `/api/projects` - View projects data
   - GET `/api/skills` - View skills data

### Troubleshooting

**Connection Error:**
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env` file
- Default connection string: `mongodb://localhost:27017/portfolio`

**Data Not Showing:**
- Check server logs for errors
- Verify the seed script completed successfully
- Check if your API routes are working correctly

## Customization

To modify the data:
1. Edit the data objects in `seedData.js`
2. Follow the same structure as existing data
3. Run the seed script again

### Example: Adding a New Project

```javascript
{
  title: 'My New Project',
  description: 'Short description',
  longDescription: 'Detailed description of the project',
  technologies: ['React', 'Node.js', 'MongoDB'],
  category: 'web',
  featured: true,
  status: 'completed',
  order: 4
}
```

Add this object to the `projectsData` array and run the seed script.

## Frontend Updates

The following frontend components have been updated with your resume information:

1. **About.jsx** - Uncommented the "6M+ Internship Experience" stat
2. **Hero.jsx** - Updated social links with your email and phone number

The frontend will automatically fetch and display the seeded data once the backend is running.
