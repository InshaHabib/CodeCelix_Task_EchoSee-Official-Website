'use client';

import { motion, type Variants } from 'framer-motion';
import CountUp from '@/components/ui/CountUp';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
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

const stats = [
    { value: 430, suffix: 'M+', label: 'People with hearing disabilities worldwide' },
    { value: 20, suffix: '+', label: 'Languages supported' },
    { value: 12, suffix: 'h', label: 'Battery life' },
    { value: 100, suffix: '%', label: 'Offline capability' },
];

export default function ImpactSection() {
    return (
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Our Impact</span>
                    <h2 className="section-title">Making a Difference</h2>
                    <p className="section-subtitle">
                        EchoSee is designed to bridge communication gaps and empower millions around the world.
                    </p>
                </div>

                <motion.div
                    className="stats-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            className="stat-card"
                            variants={itemVariants}
                        >
                            <div className="stat-value gradient-text">
                                <CountUp end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
