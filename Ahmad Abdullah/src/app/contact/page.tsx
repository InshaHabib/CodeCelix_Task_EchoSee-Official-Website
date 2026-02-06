'use client';

import { useState } from 'react';

const contactInfo = [
    { icon: '✉️', label: 'Email', value: 'info@echosee.pk', href: 'mailto:info@echosee.pk' },
    { icon: '📞', label: 'Phone', value: '+92 300 1234567', href: 'tel:+923001234567' },
    { icon: '📍', label: 'Address', value: 'Lahore, Pakistan', href: '#' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <>
            {/* Hero */}
            <section className="hero" style={{ minHeight: 'auto', paddingTop: '160px', paddingBottom: '60px' }}>
                <div className="hero-bg" />
                <div className="container">
                    <div className="hero-content">
                        <span className="section-badge">Get In Touch</span>
                        <h1 style={{ marginBottom: '24px' }}>
                            Contact <span className="gradient-text">Us</span>
                        </h1>
                        <p className="hero-subtitle">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="feature-card" style={{ padding: '40px' }}>
                            <h3 style={{ marginBottom: '32px', fontSize: '1.5rem' }}>Send us a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Select Subject</option>
                                        <option value="product">Product Inquiry</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="support">Technical Support</option>
                                        <option value="media">Media/Press</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="form-input form-textarea"
                                        placeholder="How can we help you?"
                                        rows={5}
                                        required
                                    />
                                </div>

                                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%' }}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {isSuccess && (
                                    <div style={{
                                        marginTop: '20px',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        background: 'rgba(249, 115, 22, 0.1)',
                                        border: '1px solid rgba(249, 115, 22, 0.2)',
                                        color: 'var(--primary-light)',
                                        textAlign: 'center',
                                        fontWeight: 500
                                    }}>
                                        Message sent successfully!
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            {contactInfo.map((info) => (
                                <a key={info.label} href={info.href} className="contact-info-card">
                                    <div className="contact-icon">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{info.label}</div>
                                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{info.value}</div>
                                    </div>
                                </a>
                            ))}

                            {/* Social Links */}
                            <div className="feature-card" style={{ padding: '32px', marginTop: '32px' }}>
                                <h4 style={{ marginBottom: '16px' }}>Follow Us</h4>
                                <div className="social-links">
                                    {['T', 'L', 'I', 'F'].map((letter) => (
                                        <a key={letter} href="#" className="social-link" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                                            {letter}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="feature-card" style={{ padding: '32px', marginTop: '24px' }}>
                                <h4 style={{ marginBottom: '16px' }}>Office Hours</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Monday - Friday</span>
                                        <span style={{ fontWeight: 500 }}>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Saturday</span>
                                        <span style={{ fontWeight: 500 }}>10:00 AM - 2:00 PM</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Sunday</span>
                                        <span style={{ color: '#ef4444' }}>Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
