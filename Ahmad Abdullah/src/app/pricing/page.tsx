'use client';

import { useState } from 'react';
import Link from 'next/link';

const plans = [
    {
        name: 'Basic',
        price: { onetime: 35000, monthly: 3500 },
        description: 'Essential features for daily communication',
        features: [
            'Real-time Speech to Text',
            'Urdu & English Support',
            'Font Size Adjustment',
            'Offline Mode',
            '10 Hour Battery',
            '1 Year Warranty',
        ],
        featured: false,
    },
    {
        name: 'Premium',
        price: { onetime: 40000, monthly: 4000 },
        description: 'Full feature set for premium experience',
        features: [
            'Everything in Basic',
            '20+ Language Support',
            'Emotion Detection',
            'Priority Support',
            '12 Hour Battery',
            '2 Year Warranty',
            'Cloud Backup',
            'Companion App Pro',
        ],
        featured: true,
    },
];

export default function PricingPage() {
    const [isMonthly, setIsMonthly] = useState(false);

    return (
        <>
            {/* Hero */}
            <section style={{
                minHeight: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '120px',
                paddingBottom: '40px',
                position: 'relative',
                textAlign: 'center'
            }}>
                <div className="hero-bg" />
                <div className="container">
                    <span className="section-badge">Pricing</span>
                    <h1 style={{ marginTop: '16px' }}>
                        Choose Your <span className="gradient-text">Plan</span>
                    </h1>
                    <p className="hero-subtitle">
                        Affordable pricing with flexible payment options.
                    </p>
                </div>
            </section>

            {/* Toggle - Properly Centered */}
            <section style={{ paddingBottom: '48px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    width: '100%'
                }}>
                    <span style={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: !isMonthly ? 'white' : 'var(--text-muted)',
                        transition: 'color 0.3s'
                    }}>
                        One-time Payment
                    </span>

                    <button
                        onClick={() => setIsMonthly(!isMonthly)}
                        style={{
                            width: '64px',
                            height: '34px',
                            borderRadius: '17px',
                            background: 'var(--bg-tertiary)',
                            border: '2px solid var(--border-color)',
                            cursor: 'pointer',
                            position: 'relative',
                            flexShrink: 0
                        }}
                    >
                        <span style={{
                            position: 'absolute',
                            top: '4px',
                            left: isMonthly ? '34px' : '4px',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            transition: 'left 0.3s ease',
                            boxShadow: '0 2px 8px rgba(249, 115, 22, 0.5)'
                        }} />
                    </button>

                    <span style={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: isMonthly ? 'white' : 'var(--text-muted)',
                        transition: 'color 0.3s'
                    }}>
                        12-Month Plan
                    </span>
                </div>
            </section>

            {/* Pricing Cards */}
            <section style={{ paddingBottom: '80px' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '32px',
                        maxWidth: '850px',
                        margin: '0 auto'
                    }}>
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                style={{
                                    background: plan.featured
                                        ? 'linear-gradient(180deg, rgba(249, 115, 22, 0.1) 0%, rgba(26, 26, 37, 0.95) 30%)'
                                        : 'rgba(26, 26, 37, 0.9)',
                                    border: plan.featured
                                        ? '2px solid var(--primary)'
                                        : '1px solid var(--border-color)',
                                    borderRadius: '24px',
                                    padding: '40px 32px',
                                    position: 'relative',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s, box-shadow 0.3s'
                                }}
                            >
                                {plan.featured && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-14px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                        padding: '8px 24px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: 'white',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        Recommended
                                    </span>
                                )}

                                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>
                                    {plan.name}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
                                    {plan.description}
                                </p>

                                <div style={{ marginBottom: '32px' }}>
                                    <span className="gradient-text" style={{ fontSize: '2.75rem', fontWeight: 800 }}>
                                        PKR {(isMonthly ? plan.price.monthly : plan.price.onetime).toLocaleString()}
                                    </span>
                                    <span style={{ color: 'var(--text-secondary)', marginLeft: '8px', fontSize: '1rem' }}>
                                        {isMonthly ? '/month' : ' one-time'}
                                    </span>
                                </div>

                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: '0 0 32px 0',
                                    textAlign: 'left'
                                }}>
                                    {plan.features.map((feature) => (
                                        <li key={feature} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 0',
                                            fontSize: '1rem',
                                            borderBottom: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            <svg width="20" height="20" fill="none" stroke="var(--primary)" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/contact"
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '16px 32px',
                                        borderRadius: '12px',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        textAlign: 'center',
                                        transition: 'all 0.3s',
                                        background: plan.featured
                                            ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))'
                                            : 'transparent',
                                        color: 'white',
                                        border: plan.featured ? 'none' : '2px solid var(--border-color)',
                                        boxShadow: plan.featured ? '0 4px 20px rgba(249, 115, 22, 0.3)' : 'none'
                                    }}
                                >
                                    Get {plan.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <div className="cta-card">
                        <h2>Have Questions?</h2>
                        <p>Our team is ready to help you choose the right plan.</p>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
