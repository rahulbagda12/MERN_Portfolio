import { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
    const sectionRef = useRef(null);
    const statsRef = useRef([]);
    const highlightsRef = useRef([]);

    const stats = [
        { number: '20+', label: 'Projects Completed', icon: '🚀' },
        { number: '6M+', label: 'Internship Experience', icon: '💼' },
        { number: '15+', label: 'Technologies', icon: '⚡' },
        { number: '25+', label: 'Certifications', icon: '🏆' },
    ];

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const elements = [
            sectionRef.current,
            ...statsRef.current,
            ...highlightsRef.current
        ].filter(Boolean);

        elements.forEach(el => observer.observe(el));

        // Animate stat numbers
        statsRef.current.forEach((statElement, index) => {
            if (!statElement) return;
            const target = parseInt(stats[index].number);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                const numberEl = statElement.querySelector('.stat-number');
                if (numberEl && stats[index].number.includes('+')) {
                    numberEl.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="section about" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="about-content">
                    <div className="about-text">
                        <h3 className="about-subtitle">Hi Everyone, I am Rahul Bagda</h3>
                        <p>
                            from <strong className="purple-text">Rajkot, India.</strong>
                        </p>
                        <p>
                            I am currently a <strong className="purple-text">Teaching Assistant and Tech Educator</strong> at ATMIYA University, 
                            specializing in Practical FullStack Development & Modern Web Architecture.
                        </p>
                        
                        <div className="professional-highlights">
                            <h4>Professional Highlights:</h4>
                            <ul className="highlights-list">
                                <li>
                                    <strong>Backend Development:</strong> Worked on developing backend services using <strong className="purple-text">Node.js</strong> and <strong className="purple-text">Express</strong>, 
                                    focusing on improving scalability and performance.
                                </li>
                                <li>
                                    <strong>Database Management:</strong> Managed <strong className="purple-text">MongoDB</strong> databases for efficient data storage and retrieval. 
                                    Optimized query performance.
                                </li>
                                <li>
                                    <strong>Cloud Services:</strong> Deployed applications on <strong className="purple-text">AWS</strong>, 
                                    utilizing services like EC2 and S3 for hosting and storage.
                                </li>
                                <li>
                                    <strong>Frontend Development:</strong> Developed user-friendly interfaces using <strong className="purple-text">React.js</strong>, 
                                    ensuring responsive design and smooth user experience.
                                </li>
                                <li>
                                    <strong>Version Control:</strong> Utilized <strong className="purple-text">Git</strong> for version control, 
                                    collaborating with team members on various projects.
                                </li>
                                <li>
                                    <strong>API Integration:</strong> Developed and integrated <strong className="purple-text">RESTful APIs</strong> to connect front-end and back-end systems.
                                </li>
                            </ul>
                        </div>

                        <blockquote className="about-quote">
                            <p>"Strive to build things that make a difference!"</p>
                            <footer>— Rahul</footer>
                        </blockquote>

                        <div className="about-highlights">
                            <div className="highlight-item" ref={el => highlightsRef.current[0] = el}>
                                <div className="highlight-icon pulse">
                                    <span>🎯</span>
                                </div>
                                <div>
                                    <h4>Mission-Driven</h4>
                                    <p>Focused on delivering impactful solutions</p>
                                </div>
                            </div>
                            <div className="highlight-item" ref={el => highlightsRef.current[1] = el}>
                                <div className="highlight-icon pulse">
                                    <span>💡</span>
                                </div>
                                <div>
                                    <h4>Innovation First</h4>
                                    <p>Always exploring cutting-edge technologies</p>
                                </div>
                            </div>
                            <div className="highlight-item" ref={el => highlightsRef.current[2] = el}>
                                <div className="highlight-icon pulse">
                                    <span>🤝</span>
                                </div>
                                <div>
                                    <h4>Collaborative</h4>
                                    <p>Strong team player and communicator</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-stats">
                        {stats.map((stat, index) => (
                            <div 
                                key={index} 
                                className="stat-card glass"
                                ref={el => statsRef.current[index] = el}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
