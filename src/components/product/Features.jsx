import { motion } from "framer-motion";
import { useState } from "react";

const features = [
  {
    title: "Real-time Subtitles",
    desc: "Speech converts instantly into readable text on AR lens.",
    emoji: "💬",
    color: "#667eea",
    icon: "✨",
  },
  {
    title: "Emoji Emotion Detection",
    desc: "AI detects emotion and shows expressive emojis.",
    emoji: "😊",
    color: "#f093fb",
    icon: "🎭",
  },
  {
    title: "Offline AI Processing",
    desc: "Works without internet using built-in AI chip.",
    emoji: "🧠",
    color: "#f5576c",
    icon: "⚡",
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="grid-cols-3"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem",
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {features.map((f, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ height: 200 }}
            animate={{ height: hoveredIndex === i ? 280 : 200 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              border: "1px solid rgba(102, 126, 234, 0.1)",
            }}
            whileHover={{
              boxShadow: `0 20px 50px ${f.color}40`,
            }}
          >
            {/* Background gradient on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === i ? 0.05 : 0 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: f.color,
                pointerEvents: "none",
              }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Emoji with pop animation */}
              <motion.div
                animate={hoveredIndex === i ? { scale: 1.3, rotate: 12 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  fontSize: "48px",
                  marginBottom: "12px",
                  display: "inline-block",
                }}
              >
                {f.emoji}
              </motion.div>

              {/* Icon badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: f.color,
                  color: "white",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                {f.icon}
              </motion.div>

              {/* Title */}
              <h4
                style={{
                  marginTop: "16px",
                  marginBottom: "8px",
                  color: "#0a0a0a",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                }}
              >
                {f.title}
              </h4>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                style={{
                  height: "2px",
                  background: f.color,
                  marginBottom: "12px",
                  width: "40px",
                }}
              />

              {/* Description - appears on hover */}
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hoveredIndex === i ? 1 : 0.6,
                  height: hoveredIndex === i ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  color: hoveredIndex === i ? "#333" : "#777",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {f.desc}
              </motion.p>

              {/* Learn more link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  marginTop: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: f.color,
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Learn more
                <motion.span animate={{ x: hoveredIndex === i ? 4 : 0 }}>
                  →
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
