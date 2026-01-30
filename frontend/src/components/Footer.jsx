import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        {
            name: 'GitHub',
            href: 'https://github.com',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.475 0 0 4.475 0 10c0 4.425 2.8625 8.1625 6.8375 9.4875.5.0875.6875-.2125.6875-.475 0-.2375-.0125-1.025-.0125-1.8625-2.5125.4625-3.1625-.6125-3.3625-1.175-.1125-.2875-.6-1.175-1.025-1.4125-.35-.1875-.85-.65-.0125-.6625.7875-.0125 1.35.725 1.5375 1.025.9 1.5125 2.3375 1.0875 2.9125.825.0875-.65.35-1.0875.6375-1.3375-2.225-.25-4.55-1.1125-4.55-4.9375 0-1.0875.3875-1.9875 1.025-2.6875-.1-.25-.45-1.275.1-2.65 0 0 .8375-.2625 2.75 1.025.8-.225 1.65-.3375 2.5-.3375s1.7.1125 2.5.3375c1.9125-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.6375.7 1.025 1.5875 1.025 2.6875 0 3.8375-2.3375 4.6875-4.5625 4.9375.3625.3125.675.9125.675 1.85 0 1.3375-.0125 2.4125-.0125 2.75 0 .2625.1875.575.6875.475C17.1375 18.1625 20 14.4125 20 10c0-5.525-4.475-10-10-10z" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.04 17.043h-2.962v-4.641c0-1.107-.023-2.531-1.544-2.531-1.544 0-1.78 1.204-1.78 2.449v4.722H7.796V7.5h2.845v1.301h.038c.397-.75 1.364-1.542 2.808-1.542 3.001 0 3.556 1.975 3.556 4.546v5.238zM4.447 6.194c-.951 0-1.719-.772-1.719-1.72 0-.95.768-1.72 1.72-1.72.948 0 1.72.77 1.72 1.72 0 .948-.772 1.72-1.72 1.72zm1.48 10.85h-2.96V7.5h2.96v9.543zM18.521 0H1.476C.66 0 0 .645 0 1.441v17.118C0 19.356.66 20 1.476 20h17.042c.815 0 1.482-.644 1.482-1.441V1.441C20.003.645 19.336 0 18.518 0h.003z" />
                </svg>
            )
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M19.96 3.808a8.333 8.333 0 01-2.354.646 4.132 4.132 0 001.804-2.27 8.268 8.268 0 01-2.606.996 4.1 4.1 0 00-6.987 3.735A11.662 11.662 0 011.392 2.635a4.017 4.017 0 00-.555 2.063c0 1.424.725 2.677 1.824 3.413a4.087 4.087 0 01-1.857-.513v.05a4.106 4.106 0 003.289 4.023 4.163 4.163 0 01-1.843.07 4.113 4.113 0 003.837 2.848A8.222 8.222 0 01.97 16.42a11.662 11.662 0 006.298 1.841c7.544 0 11.665-6.247 11.665-11.654 0-.175 0-.35-.012-.525A8.279 8.279 0 0020 3.825z" />
                </svg>
            )
        }
    ];

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="footer-logo">
                            <span className="logo-text">Portfolio</span>
                            <span className="logo-dot">.</span>
                        </h3>
                        <p className="footer-tagline">
                            Building digital experiences that make a difference
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} onClick={(e) => scrollToSection(e, link.href)}>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-social">
                        <h4>Connect</h4>
                        <div className="footer-social-links">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-social-link"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} Portfolio. All rights reserved.
                    </p>
                    <p className="footer-credit">
                        Designed & Built with <span className="heart">❤️</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
