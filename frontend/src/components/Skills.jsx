import { useState, useEffect } from 'react';
import axios from 'axios';
import './Skills.css';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sample skills data (fallback)
    const sampleSkills = [
        { _id: '1', name: 'Python', category: 'Languages', level: 90, icon: '🐍' },
        { _id: '2', name: 'PHP', category: 'Languages', level: 85, icon: '🐘' },
        { _id: '3', name: 'C#', category: 'Languages', level: 80, icon: '♯' },
        { _id: '4', name: 'JavaScript', category: 'Languages', level: 85, icon: '📜' },
        { _id: '5', name: 'HTML/CSS', category: 'Web Development', level: 95, icon: '🌐' },
        { _id: '6', name: 'WordPress', category: 'Web Development', level: 90, icon: '📝' },
        { _id: '7', name: 'ASP.NET', category: 'Web Development', level: 80, icon: '🌐' },
        { _id: '8', name: 'Node.js', category: 'Frameworks', level: 85, icon: '🟢' },
        { _id: '9', name: 'ExpressJS', category: 'Frameworks', level: 80, icon: '🚂' },
        { _id: '10', name: 'Bootstrap', category: 'Frameworks', level: 90, icon: '🅱️' },
        { _id: '11', name: 'AWS', category: 'Technologies', level: 75, icon: '☁️' },
        { _id: '12', name: 'OpenCV', category: 'Technologies', level: 75, icon: '👁️' },
        { _id: '13', name: 'Raspberry Pi', category: 'Technologies', level: 80, icon: '🥧' },
        { _id: '14', name: 'Android Dev', category: 'Other Skills', level: 80, icon: '📱' },
        { _id: '15', name: 'Event Monitoring', category: 'Other Skills', level: 85, icon: '📡' },
        { _id: '16', name: 'CarSim', category: 'Technologies', level: 75, icon: '🚗' },
    ];

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/skills');
            setSkills(response.data);
        } catch (error) {
            console.log('Using sample data:', error.message);
            setSkills(sampleSkills);
        } finally {
            setLoading(false);
        }
    };

    const categories = [...new Set(skills.map(s => s.category))];

    if (loading) {
        return (
            <section id="skills" className="section skills">
                <div className="container">
                    <div className="flex-center">
                        <div className="spinner"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="section skills">
            <div className="container">
                <h2 className="section-title">Skills & Expertise</h2>
                <p className="section-description">
                    Technologies and tools I work with
                </p>

                <div className="skills-container">
                    {categories.map((category, index) => (
                        <div key={category} className="skill-category" style={{ animationDelay: `${index * 0.1}s` }}>
                            <h3 className="category-title">{category}</h3>
                            <div className="skills-list">
                                {skills
                                    .filter(skill => skill.category === category)
                                    .map((skill, skillIndex) => (
                                        <div key={skill._id} className="skill-item" style={{ animationDelay: `${skillIndex * 0.05}s` }}>
                                            <div className="skill-header">
                                                <div className="skill-info">
                                                    <span className="skill-icon">{skill.icon}</span>
                                                    <div className="skill-text">
                                                        <span className="skill-name">{skill.name}</span>
                                                        <span className="skill-percentage">{skill.proficiency || skill.level}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="skill-bar">
                                                <div
                                                    className="skill-progress"
                                                    style={{ width: `${skill.proficiency || skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
