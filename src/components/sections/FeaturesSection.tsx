'use client';

import { motion, type Variants } from 'framer-motion';

const features = [
    {
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Real-time Subtitles',
        description: 'Instant speech-to-text conversion with minimal latency displayed on AR lenses.',
    },
    {
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <circle cx="9" cy="9" r="1" fill="currentColor" />
                <circle cx="15" cy="9" r="1" fill="currentColor" />
            </svg>
        ),
        title: 'Emotion Detection',
        description: "Visual emotion indicators help understand the speaker's emotional tone.",
    },
    {
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        title: '20+ Languages',
        description: 'Premium multilingual support including Urdu, English, Arabic & more.',
    },
    {
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Works Offline',
        description: 'Built-in AI chip enables full functionality without internet connection.',
    },
    {
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="12" rx="2" />
                <path d="M22 11h-2a1 1 0 000 2h2" />
                <path d="M6 11v2M10 11v2M14 11v2" />
            </svg>
        ),
        title: '10-12 Hour Battery',
        description: 'All-day battery life for uninterrupted communication.',
    },
    {
        icon: (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Adjustable Display',
        description: 'Customize text size for comfortable reading in any environment.',
    },
];

// Properly typed Framer Motion variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut' as const,
        },
    },
};

export default function FeaturesSection() {
    return (
        <section className="section section-alt">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Key Features</span>
                    <h2 className="section-title">Why Choose EchoSee?</h2>
                    <p className="section-subtitle">
                        Cutting-edge technology meets elegant design for seamless communication.
                    </p>
                </div>

                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            className="feature-card"
                            variants={itemVariants}
                        >
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
