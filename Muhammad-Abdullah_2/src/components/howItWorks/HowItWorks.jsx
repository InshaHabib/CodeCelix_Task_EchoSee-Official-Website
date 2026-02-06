import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    icon: "🎤",
    title: "Microphone",
    desc: "Noise-cancelling mic captures spoken words clearly.",
    number: 1,
    details: "Advanced noise cancellation with 360° audio pickup",
  },
  {
    icon: "🧠",
    title: "AI Processing",
    desc: "On-device AI converts speech into accurate text instantly.",
    number: 2,
    details: "Real-time neural processing with 99.2% accuracy",
  },
  {
    icon: "👓",
    title: "AR Lens Output",
    desc: "Subtitles and emojis appear directly on the AR lens.",
    number: 3,
    details: "High-resolution display with adaptive brightness",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="section" id="how-it-works">
      <motion.div
        className="container-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h2 className="gradient-text mb-3">How EchoSee Works</h2>
          <p className="text-lg text-muted" style={{ maxWidth: "500px", margin: "0 auto" }}>
            A seamless three-step process bringing speech to visual communication
          </p>
        </motion.div>

        {/* Steps container */}
        <div style={{ position: "relative", marginBottom: "80px" }}>
          {/* SVG Connecting lines - Desktop */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              display: window.innerWidth > 1024 ? "block" : "none",
              zIndex: 0,
            }}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="50%" stopColor="#764ba2" />
                <stop offset="100%" stopColor="#f5576c" />
              </linearGradient>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#667eea" />
              </marker>
            </defs>

            {/* First line */}
            <motion.line
              x1="33%"
              y1="80px"
              x2="66%"
              y2="80px"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              markerEnd="url(#arrowhead)"
            />

            {/* Second line */}
            <motion.line
              x1="66%"
              y1="80px"
              x2="100%"
              y2="80px"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              markerEnd="url(#arrowhead)"
            />
          </svg>

          {/* Steps grid */}
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              marginBottom: "40px",
              position: "relative",
              zIndex: 1,
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <motion.div
                  animate={{
                    y: activeStep === i ? -10 : 0,
                  }}
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "32px 24px",
                    boxShadow:
                      activeStep === i
                        ? "0 20px 50px rgba(102, 126, 234, 0.2)"
                        : "0 12px 30px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    border: "1px solid rgba(102, 126, 234, 0.1)",
                    textAlign: "center",
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    boxShadow: "0 20px 50px rgba(102, 126, 234, 0.2)",
                  }}
                >
                  {/* Background gradient */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === i ? 0.08 : 0 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Step number badge */}
                  <motion.div
                    animate={{
                      scale: activeStep === i ? 1.2 : 1,
                    }}
                    style={{
                      position: "relative",
                      zIndex: 2,
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${
                        i === 0 ? "#667eea" : i === 1 ? "#764ba2" : "#f5576c"
                      }, ${i === 0 ? "#764ba2" : i === 1 ? "#f5576c" : "#f093fb"})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "24px",
                      fontWeight: "bold",
                      margin: "0 auto 16px",
                      boxShadow: activeStep === i
                        ? `0 8px 20px ${
                            i === 0 ? "#667eea" : i === 1 ? "#764ba2" : "#f5576c"
                          }40`
                        : "none",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: activeStep === i ? 1.2 : 1,
                      rotate: activeStep === i ? 10 : 0,
                    }}
                    style={{
                      fontSize: "48px",
                      marginBottom: "16px",
                      position: "relative",
                      zIndex: 2,
                      display: "inline-block",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Title */}
                  <h3
                    style={{
                      marginBottom: "12px",
                      color: "#0a0a0a",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Divider */}
                  <motion.div
                    animate={{
                      scaleX: activeStep === i ? 1 : 0.6,
                    }}
                    style={{
                      height: "2px",
                      background: `linear-gradient(90deg, ${
                        i === 0 ? "#667eea" : i === 1 ? "#764ba2" : "#f5576c"
                      }, transparent)`,
                      margin: "12px auto",
                      width: "40px",
                      position: "relative",
                      zIndex: 2,
                    }}
                  />

                  {/* Description */}
                  <p
                    style={{
                      color: "#555",
                      margin: "12px 0",
                      fontSize: "0.95rem",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {step.desc}
                  </p>

                  {/* Expandable details */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeStep === i ? 1 : 0,
                      height: activeStep === i ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#888",
                        marginTop: "12px",
                        fontStyle: "italic",
                      }}
                    >
                      {step.details}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Flow arrows - Mobile view */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "bold",
            display: window.innerWidth <= 1024 ? "block" : "none",
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎤 ➜ 🧠 ➜ 👓
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginTop: "60px",
          }}
        >
          <p style={{ color: "#888", marginBottom: "20px" }}>
            Experience the future of communication
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "12px 32px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
            }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
