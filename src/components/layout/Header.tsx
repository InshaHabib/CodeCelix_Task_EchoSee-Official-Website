'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/product', label: 'Product' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
];

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        // Use passive listener for better scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header
                className={`header ${isScrolled ? 'scrolled' : ''}`}
                suppressHydrationWarning
                style={{ willChange: isScrolled ? 'auto' : 'background' }}
            >
                <div className="container">
                    <div className="header-inner">
                        {/* Logo */}
                        <Link href="/" className="logo" onClick={handleLinkClick}>
                            <div className="logo-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            </div>
                            <span className="logo-text gradient-text">EchoSee</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="nav-desktop" aria-label="Main navigation">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                                    onClick={handleLinkClick}
                                    prefetch={true}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Button - Desktop */}
                        <div className="header-cta">
                            <Link href="/pricing" className="btn btn-primary btn-sm" prefetch={true}>
                                Pre-Order Now
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
                            onClick={toggleMenu}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Portal */}
            {mounted && createPortal(
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`mobile-menu-link ${pathname === link.href ? 'active' : ''}`}
                            onClick={handleLinkClick}
                            prefetch={true}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ marginTop: '16px' }}>
                        <Link href="/pricing" className="btn btn-primary" onClick={handleLinkClick} style={{ width: '100%' }}>
                            Pre-Order Now
                        </Link>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

// Memoize Header to prevent unnecessary re-renders
export default memo(Header);
