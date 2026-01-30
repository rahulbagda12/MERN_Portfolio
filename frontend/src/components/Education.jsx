import { useState, useEffect } from 'react';
import axios from 'axios';
import './Education.css';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAllCerts, setShowAllCerts] = useState(false);

    // Sample education data (fallback)
    const sampleEducation = [
        {
            _id: '1',
            institution: 'Atmiya Institute of Technology & Science',
            degree: 'Master of Computer Applications - MCA',
            field: 'Computer Science',
            startDate: '2023-08-01',
            endDate: '2025-05-31',
            gpa: null,
            achievements: ['Specializing in FullStack Development']
        },
        {
            _id: '2',
            institution: 'T.N.RAO INSTITUTE OF MANAGEMENT RESEARCH & TECHNOLOGY',
            degree: 'Bachelor of Computer Application',
            field: 'Information Technology',
            startDate: '2021-06-01',
            endDate: '2023-05-31',
            gpa: null,
            achievements: []
        }
    ];

    const certifications = [
        'AWS For Beginners — Great Learning (Jun 2024)',
        'Build a free website with WordPress — Coursera (Jun 2024)',
        'Google Ads For Beginners — Coursera (Jun 2024)',
        'PHP for Beginners — Great Learning (Jun 2024)',
        'Python Fundamentals for Beginners — Great Learning (Jun 2024)',
        'Python for Data Science — Great Learning (Jun 2024)',
        'Certificate Of 2nd Rank in Python Poster Presentation — ATMIYA UNIVERSITY (Mar 2024)',
        'Next-Gen-Autonomy — ATMIYA UNIVERSITY (Mar 2024)',
        'Environmental Monitoring System (IoT) & Central Event Notification App (Android) — Hackathon, ATMIYA UNIVERSITY (Sep 2023)',
        'Certificate Of 3rd Rank In Bachelor Of Computer Applications S5 — T.N.Rao Institute of Management Research & Technology (Nov 2022)',
        'Data Science Basics — Marwadi University (Jul 2022)',
        'Phishing And Cyber Security Awareness — Marwadi University (Jul 2022)',
        'Basic Image Processing Using Python — Marwadi University (Jun 2022)',
        'DB Connectivity In C# — Marwadi University (Jun 2022)',
        'Python Application Development — Marwadi University (Feb 2022)',
        'Participate In Poster Presentation — T.N.Rao College (Jan 2022)',
        'Application Development Using Android — Marwadi University (Jun 2021)',
        'Big Data - Hadoop Map Reduce — Marwadi University (May 2021)',
        'Certificate Of Attending A Seminar — Gujarat Ecological Education and Research (GEER) Foundation (Jul 2019)',
        'Certificate Of Attending A Quiz GK IQ 41th — Vikas Vartul Trust Bhavnagar (Sep 2018)',
        'Certificate Of Participate In Science Fair — District Institute of Education & Training, Rajkot (Dec 2017)',
        'Certificate Of Attending A Quiz GK IQ 39th — Vikas Vartul Trust Bhavnagar (Sep 2016)',
        'Certificate Of Attending A Quiz GK IQ 38th — Vikas Vartul Trust Bhavnagar (Sep 2015)',
        'Certificate Of Learning Programming In Engineering Sector & Seminar On Awareness Of Technical Education — Asiatic Institute of Science and Technology (Jul 2015)',
    ];

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/education');
            setEducation(response.data);
        } catch (error) {
            console.log('Using sample data:', error.message);
            setEducation(sampleEducation);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return 'Present';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const visibleCerts = showAllCerts ? certifications : certifications.slice(0, 5);

    if (loading) {
        return (
            <section id="education" className="section education">
                <div className="container">
                    <div className="flex-center">
                        <div className="spinner"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="education" className="section education">
            <div className="container">
                <h2 className="section-title">Education & Certifications</h2>
                <p className="section-description">
                    My academic background and professional qualifications
                </p>

                <div className="education-grid">
                    {education.map((edu, index) => (
                        <div key={edu._id} className="education-card card" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="education-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <path d="M20 5L5 12.5L20 20L35 12.5L20 5Z" fill="url(#eduGradient)" />
                                    <path d="M5 17.5V25L20 32.5L35 25V17.5" stroke="url(#eduGradient)" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="eduGradient" x1="5" y1="5" x2="35" y2="35">
                                            <stop offset="0%" stopColor="hsl(250, 84%, 54%)" />
                                            <stop offset="100%" stopColor="hsl(320, 85%, 55%)" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className="education-content">
                                <h3 className="education-degree">{edu.degree}</h3>
                                <h4 className="education-field">{edu.field}</h4>
                                <p className="education-institution">{edu.institution}</p>

                                <div className="education-meta">
                                    <span className="education-date">
                                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                    </span>
                                    {edu.gpa && (
                                        <span className="education-gpa">GPA: {edu.gpa}/4.0</span>
                                    )}
                                </div>

                                {edu.achievements && edu.achievements.length > 0 && (
                                    <div className="education-achievements">
                                        <h5>Key Achievements:</h5>
                                        <ul>
                                            {edu.achievements.map((achievement, i) => (
                                                <li key={i}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="certifications-container">
                    <h3 className="section-title certifications-title">Certifications</h3>
                    <div className="certifications-grid">
                        {visibleCerts.map((cert, index) => (
                            <div key={index} className="certification-card card glass">
                                <div className="certification-icon">🏅</div>
                                <span className="certification-text">{cert}</span>
                            </div>
                        ))}
                    </div>
                    {certifications.length > 5 && (
                        <button
                            type="button"
                            className="certifications-toggle"
                            onClick={() => setShowAllCerts((prev) => !prev)}
                            aria-expanded={showAllCerts}
                        >
                            {showAllCerts ? 'Show less' : 'Show more'}
                            <span className="certifications-toggle-arrow">{showAllCerts ? '↑' : '↓'}</span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Education;
