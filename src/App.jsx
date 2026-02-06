import { motion } from "framer-motion";
import { useState } from "react";
import ProductPage from "./pages/ProductPage";
import HowItWorksPage from "./pages/HowItWorksPage";

export const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (e) => {
    const element = e.target;
    setScrollY(element.scrollLeft);
  };

  const navItems = [
    { label: "Product", href: "#product" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,247,250,0.95) 100%)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            height: "100%",
            padding: "0 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "1.3rem",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            👓 EchoSee
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "none",
              gap: "2rem",
              "@media (min-width: 768px)": {
                display: "flex",
              },
            }}
            className="hide-mobile"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -2 }}
                style={{
                  cursor: "pointer",
                  color: "#555",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
                onClick={() => scrollToSection(item.href)}
                onMouseEnter={(e) => {
                  e.target.style.color = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#555";
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
            className="show-mobile"
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 12 : 0 }}
              style={{
                width: "24px",
                height: "3px",
                background: "#667eea",
                borderRadius: "2px",
              }}
            />
            <motion.div
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              style={{
                width: "24px",
                height: "3px",
                background: "#667eea",
                borderRadius: "2px",
              }}
            />
            <motion.div
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -12 : 0 }}
              style={{
                width: "24px",
                height: "3px",
                background: "#667eea",
                borderRadius: "2px",
              }}
            />
          </motion.button>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "0.9rem",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              display: window.innerWidth > 768 ? "block" : "none",
            }}
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: "70px",
            left: 0,
            right: 0,
            background: "white",
            borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                style={{
                  cursor: "pointer",
                  color: "#555",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  padding: "8px 0",
                }}
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <main style={{ paddingTop: "70px", overflow: "hidden" }}>
        {/* Hero Section */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated background shapes */}
          <motion.div
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(102, 126, 234, 0.1)",
              top: "10%",
              left: "10%",
              filter: "blur(40px)",
            }}
          />
          <motion.div
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(245, 87, 108, 0.1)",
              bottom: "10%",
              right: "10%",
              filter: "blur(40px)",
            }}
          />

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textAlign: "center",
              maxWidth: "800px",
              padding: "0 1.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ fontSize: "80px", marginBottom: "20px" }}
            >
              👓
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                fontWeight: "700",
                marginBottom: "20px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EchoSee Smart Glasses
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontSize: "clamp(1rem, 3vw, 1.25rem)",
                color: "#555",
                marginBottom: "40px",
                maxWidth: "600px",
                margin: "0 auto 40px",
              }}
            >
              Breaking barriers in communication with AI-powered, real-time subtitles and expressive emoji on AR lenses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "14px 32px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                }}
                onClick={() => scrollToSection("#product")}
              >
                Explore Product
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "14px 32px",
                  borderRadius: "12px",
                  border: "2px solid #667eea",
                  background: "transparent",
                  color: "#667eea",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={() => scrollToSection("#how-it-works")}
              >
                How It Works
              </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "24px",
              }}
            >
              ⬇️
            </motion.div>
          </motion.div>
        </section>

        {/* Product Section */}
        <ProductPage />

        {/* How It Works Section */}
        <HowItWorksPage />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(135deg, #0a0a0a, #1a1a2e)",
            color: "white",
            padding: "60px 20px 40px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h3 style={{ marginBottom: "10px", color: "#fff" }}>EchoSee</h3>
            <p style={{ color: "#aaa", marginBottom: "30px" }}>
              Transforming communication through AI-powered AR technology
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginBottom: "30px",
                flexWrap: "wrap",
              }}
            >
              <a href="#" style={{ color: "#aaa", textDecoration: "none" }} onMouseEnter={(e) => e.target.style.color = "#667eea"} onMouseLeave={(e) => e.target.style.color = "#aaa"}>
                Privacy Policy
              </a>
              <a href="#" style={{ color: "#aaa", textDecoration: "none" }} onMouseEnter={(e) => e.target.style.color = "#667eea"} onMouseLeave={(e) => e.target.style.color = "#aaa"}>
                Terms of Service
              </a>
              <a href="#" style={{ color: "#aaa", textDecoration: "none" }} onMouseEnter={(e) => e.target.style.color = "#667eea"} onMouseLeave={(e) => e.target.style.color = "#aaa"}>
                Contact
              </a>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", color: "#888" }}>
              <p>© 2026 EchoSee. All rights reserved.</p>
            </div>
          </div>
        </motion.footer>
      </main>
    </>
  );
};
