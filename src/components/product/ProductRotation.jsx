import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductRotation() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const diff = e.clientX - startX;
      setRotation((prev) => prev + diff * 0.5);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsAutoRotating(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{
        textAlign: "center",
        marginBottom: "60px",
        position: "relative",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background glow */}
      <motion.div
        animate={{
          boxShadow: isAutoRotating
            ? [
                "0 0 40px rgba(102, 126, 234, 0.4)",
                "0 0 60px rgba(102, 126, 234, 0.6)",
                "0 0 40px rgba(102, 126, 234, 0.4)",
              ]
            : "0 0 40px rgba(102, 126, 234, 0.4)",
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Product image container */}
      <motion.div
        animate={
          isAutoRotating
            ? { rotate: 360 }
            : { rotate: rotation }
        }
        transition={
          isAutoRotating
            ? { duration: 20, repeat: Infinity, ease: "linear" }
            : { duration: 0 }
        }
        style={{
          position: "relative",
          zIndex: 1,
          cursor: isDragging ? "grabbing" : "grab",
          display: "inline-block",
        }}
      >
        <motion.img
          src="/glasses.avif"
          alt="EchoSee Smart Glasses"
          style={{
            width: "clamp(200px, 50vw, 350px)",
            maxWidth: "350px",
            height: "auto",
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
            userSelect: "none",
          }}
          whileHover={!isDragging ? { scale: 1.05 } : {}}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </motion.div>

      {/* Info text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          marginTop: "30px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <p
          style={{
            color: "#667eea",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          {isAutoRotating ? "🔄 Auto-rotating" : "👆 Drag to rotate"}
        </p>
        <p style={{ color: "#888", fontSize: "14px", margin: "0" }}>
          360° interactive view — {isAutoRotating ? "hover" : "release"} to see all angles
        </p>
      </motion.div>

      {/* Rotation speed indicator */}
      <motion.div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "6px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ scaleY: isAutoRotating ? [1, 3, 1] : 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            style={{
              width: "3px",
              height: "16px",
              background: "linear-gradient(to top, #667eea, #764ba2)",
              borderRadius: "2px",
            }}
          />
        ))}
      </motion.div>

      {/* Mobile hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "#aaa",
          position: "relative",
          zIndex: 2,
        }}
      >
        💡 Tip: Click and drag to manually rotate
      </motion.div>
    </motion.div>
  );
}
