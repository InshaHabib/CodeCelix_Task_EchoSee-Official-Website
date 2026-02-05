'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut' as const,
        },
    },
};

export default function PreOrderSection() {
    return (
        <section className="section">
            <div className="container">
                <motion.div
                    className="cta-card"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2 variants={itemVariants}>
                        Ready to Experience EchoSee?
                    </motion.h2>
                    <motion.p variants={itemVariants}>
                        Join thousands who are changing how the world communicates. Pre-order now and be among the first to experience this revolutionary technology.
                    </motion.p>
                    <motion.div className="cta-buttons" variants={itemVariants}>
                        <Link href="/pricing" className="btn btn-primary">
                            View Pricing & Pre-Order
                        </Link>
                        <Link href="/about" className="btn btn-secondary">
                            Learn More About Us
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
