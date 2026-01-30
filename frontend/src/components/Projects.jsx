import { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    // Sample projects data (fallback if API fails)
    const sampleProjects = [
        {
            _id: '1',
            title: 'Environmental Monitoring System (IoT)',
            description: 'Developed using Raspberry Pi and Python for real-time environmental data tracking and monitoring.',
            image: null,
            technologies: ['Python', 'Raspberry Pi', 'IoT', 'Sensors'],
            liveUrl: '#',
            githubUrl: '#',
            category: 'iot'
        },
        {
            _id: '2',
            title: 'Central Event Notification App',
            description: 'Built an Android app during a hackathon to streamline event notifications and updates for users.',
            image: null,
            technologies: ['Android', 'Java', 'XML', 'Firebase'],
            liveUrl: '#',
            githubUrl: '#',
            category: 'mobile'
        },
        {
            _id: '3',
            title: 'Self Driving Car Simulation',
            description: 'Created a Python & OpenCV-based simulation project demonstrating autonomous vehicle functionalities.',
            image: null,
            technologies: ['Python', 'OpenCV', 'Computer Vision', 'AI'],
            liveUrl: '#',
            githubUrl: '#',
            category: 'ai'
        }
    ];

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/projects');
            setProjects(response.data);
        } catch (error) {
            console.log('Using sample data:', error.message);
            setProjects(sampleProjects);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['all', 'iot', 'mobile', 'ai'];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    if (loading) {
        return (
            <section id="projects" className="section projects">
                <div className="container">
                    <div className="flex-center">
                        <div className="spinner"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="section projects bg-pattern">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-description">
                    A showcase of my recent work and personal projects
                </p>

                <div className="project-filters">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`filter-btn ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div key={project._id} className="project-card card" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="project-image">
                                {project.image ? (
                                    <img src={`http://localhost:5000${project.image}`} alt={project.title} />
                                ) : (
                                    <div className="project-placeholder">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                            <rect width="80" height="80" rx="8" fill="url(#projectGradient)" />
                                            <path d="M40 25L50 35L40 45M40 35H30" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                            <defs>
                                                <linearGradient id="projectGradient" x1="0" y1="0" x2="80" y2="80">
                                                    <stop offset="0%" stopColor="hsl(250, 84%, 54%)" />
                                                    <stop offset="100%" stopColor="hsl(320, 85%, 55%)" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                )}
                                <div className="project-overlay">
                                    <div className="project-links">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M10 3.5C6.41 3.5 3.5 6.41 3.5 10C3.5 13.59 6.41 16.5 10 16.5C13.59 16.5 16.5 13.59 16.5 10C16.5 6.41 13.59 3.5 10 3.5ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15Z" fill="currentColor" />
                                                </svg>
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 0C4.475 0 0 4.475 0 10c0 4.425 2.8625 8.1625 6.8375 9.4875.5.0875.6875-.2125.6875-.475 0-.2375-.0125-1.025-.0125-1.8625-2.5125.4625-3.1625-.6125-3.3625-1.175-.1125-.2875-.6-1.175-1.025-1.4125-.35-.1875-.85-.65-.0125-.6625.7875-.0125 1.35.725 1.5375 1.025.9 1.5125 2.3375 1.0875 2.9125.825.0875-.65.35-1.0875.6375-1.3375-2.225-.25-4.55-1.1125-4.55-4.9375 0-1.0875.3875-1.9875 1.025-2.6875-.1-.25-.45-1.275.1-2.65 0 0 .8375-.2625 2.75 1.025.8-.225 1.65-.3375 2.5-.3375s1.7.1125 2.5.3375c1.9125-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.6375.7 1.025 1.5875 1.025 2.6875 0 3.8375-2.3375 4.6875-4.5625 4.9375.3625.3125.675.9125.675 1.85 0 1.3375-.0125 2.4125-.0125 2.75 0 .2625.1875.575.6875.475C17.1375 18.1625 20 14.4125 20 10c0-5.525-4.475-10-10-10z" />
                                                </svg>
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-tech">
                                    {project.technologies?.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
