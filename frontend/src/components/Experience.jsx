import { useState, useEffect } from 'react';
import axios from 'axios';
import './Experience.css';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sample experience data (fallback)
    const sampleExperiences = [
        {
            _id: '1',
            company: 'ATMIYA UNIVERSITY',
            position: 'Teaching Assistant',
            startDate: '2025-07-01',
            endDate: null,
            current: true,
            location: 'Rajkot, Gujarat, India',
            responsibilities: [
                'Mentoring students and contributing to the learning environment.',
                'Leveraging expertise in web technologies to support academic programs.',
                'Specializing in Practical FullStack Development & Modern Web Architecture.'
            ]
        },
        {
            _id: '2',
            company: 'Imbuesoft',
            position: 'Intern Mern Stack Developer',
            startDate: '2024-12-01',
            endDate: '2025-11-30',
            current: false,
            location: 'Rajkot, Gujarat, India',
            responsibilities: [
                'Enhanced skills in application development and event monitoring.',
                'Worked on full-stack web development using MongoDB, Express, React, and Node.js.',
                'Contributed to real-world projects and gained hands-on experience in modern web technologies.'
            ]
        }
    ];

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/experience');
            setExperiences(response.data);
        } catch (error) {
            console.log('Using sample data:', error.message);
            setExperiences(sampleExperiences);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return 'Present';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    if (loading) {
        return (
            <section id="experience" className="section experience">
                <div className="container">
                    <div className="flex-center">
                        <div className="spinner"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="section experience bg-pattern">
            <div className="container">
                <h2 className="section-title">Work Experience</h2>
                <p className="section-description">
                    My professional journey and career highlights
                </p>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <div key={exp._id} className="timeline-item" style={{ animationDelay: `${index * 0.15}s` }}>
                            <div className="timeline-marker">
                                <div className="timeline-dot"></div>
                                {index < experiences.length - 1 && <div className="timeline-line"></div>}
                            </div>

                            <div className="timeline-content card">
                                <div className="experience-header">
                                    <div>
                                        <h3 className="experience-position">{exp.position}</h3>
                                        <h4 className="experience-company">{exp.company}</h4>
                                    </div>
                                    {exp.current && (
                                        <span className="current-badge">Current</span>
                                    )}
                                </div>

                                <div className="experience-meta">
                                    <span className="experience-date">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M12 2H11V1H10V2H6V1H5V2H4C3.45 2 3 2.45 3 3V13C3 13.55 3.45 14 4 14H12C12.55 14 13 13.55 13 13V3C13 2.45 12.55 2 12 2ZM12 13H4V5H12V13Z" fill="currentColor" />
                                        </svg>
                                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                                    </span>
                                    <span className="experience-location">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 1C5.79 1 4 2.79 4 5C4 7.5 8 13 8 13C8 13 12 7.5 12 5C12 2.79 10.21 1 8 1ZM8 6.5C7.17 6.5 6.5 5.83 6.5 5C6.5 4.17 7.17 3.5 8 3.5C8.83 3.5 9.5 4.17 9.5 5C9.5 5.83 8.83 6.5 8 6.5Z" fill="currentColor" />
                                        </svg>
                                        {exp.location}
                                    </span>
                                </div>

                                <ul className="experience-responsibilities">
                                    {exp.responsibilities?.map((resp, i) => (
                                        <li key={i}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
