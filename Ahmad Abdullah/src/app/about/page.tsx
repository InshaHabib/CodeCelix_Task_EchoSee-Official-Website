'use client';

import Link from 'next/link';

const timeline = [
    { year: '2022', title: 'The Idea', desc: 'Identified communication challenges faced by the hearing-impaired community.' },
    { year: '2023', title: 'R&D Phase', desc: 'Partnered with AI experts and audiologists to develop core technology.' },
    { year: '2024', title: 'Prototype Launch', desc: 'Created working prototypes and conducted user testing.' },
    { year: '2025', title: 'Market Ready', desc: 'Finalized design and preparing for global launch.' },
];

const stats = [
    { value: '430M+', label: 'People with hearing loss globally' },
    { value: '20M+', label: 'Affected in Pakistan alone' },
    { value: '85%', label: 'Live in developing countries' },
    { value: '100K+', label: 'Potential early adopters' },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg" />
                <div className="container">
                    <div className="hero-content">
                        <span className="section-badge fade-in">Our Story</span>
                        <h1 className="animate-fade-in delay-100">
                            Empowering the <span className="shine-text">Hearing-Impaired</span> Community
                        </h1>
                        <p className="hero-subtitle animate-fade-in delay-200">
                            Breaking communication barriers for 430+ million people worldwide through innovative AR technology.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Problem */}
            <section className="section section-alt">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card text-center">
                            <div className="feature-icon mx-auto">
                                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="12" r="6" />
                                    <circle cx="12" cy="12" r="2" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Our Mission</h3>
                            <p className="feature-desc">
                                To break communication barriers for people with hearing disabilities through innovative AR technology.
                            </p>
                        </div>

                        <div className="feature-card text-center">
                            <div className="feature-icon mx-auto">
                                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Our Vision</h3>
                            <p className="feature-desc">
                                A world where hearing impairment is no longer a barrier to full participation in society.
                            </p>
                        </div>

                        <div className="feature-card text-center">
                            <div className="feature-icon mx-auto">
                                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="feature-title">The Problem</h3>
                            <p className="feature-desc">
                                Traditional hearing aids amplify sound but don't help with speech comprehension. EchoSee converts speech to visual text.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title gradient-text">Global Impact</h2>
                    </div>
                    <div className="stats-row">
                        {stats.map((stat) => (
                            <div key={stat.label} className="stat-item">
                                <div className="stat-value gradient-text">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title gradient-text">Our Journey</h2>
                    </div>
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        {timeline.map((item, idx) => (
                            <div key={item.year} style={{
                                display: 'flex',
                                gap: '24px',
                                paddingBottom: idx === timeline.length - 1 ? 0 : '32px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '60px',
                                    flexShrink: 0,
                                    textAlign: 'right',
                                    fontWeight: 700,
                                    color: 'var(--primary)'
                                }}>
                                    {item.year}
                                </div>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: 'var(--primary)',
                                    flexShrink: 0,
                                    marginTop: '6px',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    {idx !== timeline.length - 1 && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '2px',
                                            height: '100%',
                                            background: 'rgba(249, 115, 22, 0.3)'
                                        }} />
                                    )}
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>{item.title}</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <div className="cta-card">
                        <h2>Ready to Join Our Mission?</h2>
                        <p>Be part of the accessibility revolution. Pre-order EchoSee today and help us change lives.</p>
                        <div className="cta-buttons">
                            <Link href="/pricing" className="btn btn-primary">Pre-Order Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
