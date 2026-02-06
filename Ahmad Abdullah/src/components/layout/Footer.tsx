import Link from 'next/link';

const footerLinks = {
    Product: [
        { label: 'Features', href: '/product' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Specifications', href: '/product' },
    ],
    Company: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Partners', href: '/about' },
    ],
    Support: [
        { label: 'FAQ', href: '/pricing' },
        { label: 'Help Center', href: '/contact' },
        { label: 'Privacy Policy', href: '#' },
    ],
};

const socialLinks = [
    {
        label: 'Twitter',
        href: '#',
        icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
        )
    },
    {
        label: 'LinkedIn',
        href: '#',
        icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        )
    },
    {
        label: 'Instagram',
        href: '#',
        icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        )
    },
    {
        label: 'Facebook',
        href: '#',
        icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        )
    },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link href="/" className="logo" style={{ marginBottom: '16px' }}>
                            <div className="logo-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            </div>
                            <span className="logo-text gradient-text">EchoSee</span>
                        </Link>
                        <p>
                            Revolutionary AR smart glasses that transform speech into real-time subtitles for the hearing-impaired community.
                        </p>
                        <div className="social-links">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="social-link"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="footer-column">
                            <h4 className="footer-title">{title}</h4>
                            <ul className="footer-links">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} EchoSee. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link href="#">Terms of Service</Link>
                        <Link href="#">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
