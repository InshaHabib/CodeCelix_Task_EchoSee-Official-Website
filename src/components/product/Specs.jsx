import { motion } from "framer-motion";

const specs = [
  { icon: "👓", label: "AR Lens + Micro Projector", color: "#667eea" },
  { icon: "🧠", label: "AI Processor Chip", color: "#f093fb" },
  { icon: "🎤", label: "Noise-Cancelling Microphone", color: "#f5576c" },
  { icon: "🔋", label: "10–12 Hours Battery Life", color: "#ffa502" },
  { icon: "📷", label: "Optional Camera Module", color: "#2ed573" },
];

export default function Specs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{ maxWidth: "700px", margin: "60px auto", padding: "0 20px" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        style={{ marginBottom: "40px", textAlign: "center" }}
      >
        <h3 style={{ marginBottom: "10px" }}>Hardware Specifications</h3>
        <p style={{ color: "#888", margin: 0 }}>
          Cutting-edge technology packed into a sleek design
        </p>
      </motion.div>

      {/* Specs list with animated line draw */}
      <motion.div
        style={{ position: "relative", paddingLeft: "20px" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Vertical line behind specs */}
        <svg
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "2px",
            height: "100%",
            overflow: "visible",
          }}
          preserveAspectRatio="none"
        >
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f5576c" />
            </linearGradient>
          </defs>
        </svg>

        {specs.map((spec, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            style={{
              padding: "16px 20px",
              marginBottom: "16px",
              borderRadius: "12px",
              background: "white",
              border: `1px solid ${spec.color}20`,
              position: "relative",
              overflow: "hidden",
            }}
            whileHover={{
              boxShadow: `0 8px 24px ${spec.color}30`,
              x: 8,
            }}
          >
            {/* Background gradient on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.05 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: spec.color,
                pointerEvents: "none",
              }}
            />

            {/* Animated dot on timeline */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              style={{
                position: "absolute",
                left: "-13px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: spec.color,
                boxShadow: `0 0 0 4px rgba(255,255,255,1), 0 0 0 8px ${spec.color}40`,
              }}
            />

            {/* Content */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative", zIndex: 1 }}>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                style={{ fontSize: "24px", display: "inline-block" }}
              >
                {spec.icon}
              </motion.span>
              <span style={{ fontWeight: "600", color: "#0a0a0a", flex: 1 }}>
                {spec.label}
              </span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ color: spec.color, fontWeight: "bold" }}
              >
                ✓
              </motion.span>
            </div>

            {/* Shine effect on hover */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(90deg, transparent, white, transparent)",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          height: "2px",
          background: "linear-gradient(90deg, #667eea, #764ba2, #f5576c)",
          marginTop: "40px",
          borderRadius: "2px",
        }}
      />
    </motion.div>
  );
}
