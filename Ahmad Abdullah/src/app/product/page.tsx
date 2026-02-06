'use client';

import { useState } from 'react';
import Link from 'next/link';

const features = [
    { title: 'Real-time Transcription', desc: 'Advanced AI converts speech to text in milliseconds, displaying subtitles instantly on your AR lens.' },
    { title: 'Adjustable Font Size', desc: 'Easily customize text size through gestures or the companion app.' },
    { title: 'Emotion Detection', desc: 'Understand emotional context with AI-detected emotions displayed alongside text.' },
    { title: 'Multilingual Support', desc: 'Basic: Urdu + English. Premium: 20+ languages including Arabic, Chinese, Spanish.' },
    { title: 'Offline AI Processing', desc: 'Dedicated AI chip processes everything locally - no internet required.' },
    { title: 'Noise-Cancelling Mic', desc: 'Advanced directional microphone filters background noise.' },
];

const specs = [
    { label: 'Display', value: 'AR Lens + Micro Projector' },
    { label: 'Processor', value: 'Custom AI Chip (5nm)' },
    { label: 'Microphone', value: 'Dual Noise-Cancelling' },
    { label: 'Battery', value: '10-12 Hours' },
    { label: 'Weight', value: '45g (Lightweight)' },
    { label: 'Connectivity', value: 'Bluetooth 5.2 / WiFi 6' },
    { label: 'Camera', value: 'Optional 8MP' },
    { label: 'Storage', value: '32GB Internal' },
];

export default function ProductPage() {
    const [activeFeature, setActiveFeature] = useState<number | null>(null);

    return (
        <>
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg" />
                <div className="container">
                    <div className="hero-content">
                        <span className="section-badge">Product Details</span>
                        <h1 className="animate-fade-in delay-100">
                            EchoSee <span className="shine-text">Smart Glasses</span>
                        </h1>
                        <p className="hero-subtitle animate-fade-in delay-200">
                            Cutting-edge AR technology meets elegant design. Experience the future of accessible communication.
                        </p>
                    </div>
                </div>
            </section>

            {/* Product Showcase */}
            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <div style={{
                            aspectRatio: '1',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(139, 92, 246, 0.1))',
                            border: '1px solid rgba(249, 115, 22, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <svg width="200" height="100" viewBox="0 0 100 50" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                                <ellipse cx="25" cy="25" rx="18" ry="15" />
                                <ellipse cx="75" cy="25" rx="18" ry="15" />
                                <path d="M43 25 H57" strokeWidth="2" />
                                <path d="M7 25 L2 23" strokeLinecap="round" />
                                <path d="M93 25 L98 23" strokeLinecap="round" />
                            </svg>
                            <div style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                background: 'rgba(249, 115, 22, 0.2)',
                                fontSize: '0.75rem',
                                color: 'var(--primary-light)'
                            }}>
                                AR Lens
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '16px',
                                left: '16px',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                background: 'rgba(139, 92, 246, 0.2)',
                                fontSize: '0.75rem',
                                color: 'var(--accent-light)'
                            }}>
                                AI Chip
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features List */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title gradient-text">Product Features</h2>
                    </div>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                                style={{
                                    background: activeFeature === index ? 'rgba(249, 115, 22, 0.05)' : 'rgba(26, 26, 37, 0.6)',
                                    border: `1px solid ${activeFeature === index ? 'var(--primary)' : 'var(--border-color)'}`,
                                    borderRadius: '16px',
                                    padding: '20px 24px',
                                    marginBottom: '12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h4 style={{ fontWeight: 600 }}>{feature.title}</h4>
                                    <svg
                                        width="20" height="20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        style={{
                                            transform: activeFeature === index ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 0.3s',
                                            color: 'var(--text-muted)'
                                        }}
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                                {activeFeature === index && (
                                    <div className="animate-fade-in" style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        {feature.desc}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specifications */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title gradient-text">Hardware Specifications</h2>
                    </div>
                    <div className="pricing-grid">
                        {specs.map((spec) => (
                            <div key={spec.label} className="stat-item">
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{spec.label}</div>
                                <div style={{ fontWeight: 600, color: 'var(--primary-light)' }}>{spec.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section-alt">
                <div className="container">
                    <div className="cta-card">
                        <h2>Ready to Get Yours?</h2>
                        <p>Choose from our Basic or Premium plans to get started with EchoSee.</p>
                        <div className="cta-buttons">
                            <Link href="/pricing" className="btn btn-primary">View Pricing Options</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
