import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const subtitles = [
  "Hello, welcome to EchoSee 😊",
  "I can hear you clearly",
  "Converting speech to text instantly ✨",
  "AI processing in real-time 🧠",
];

export default function LiveSubtitle() {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentSubtitle = subtitles[currentSubtitleIndex];
    let charIndex = 0;

    if (!isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setIsTyping(true);
        setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      if (charIndex < currentSubtitle.length) {
        setDisplayedText(currentSubtitle.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentSubtitleIndex, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "#00ff88",
        padding: "40px 30px",
        borderRadius: "20px",
        maxWidth: "600px",
        margin: "60px auto",
        fontFamily: "monospace",
        textAlign: "center",
        border: "1px solid rgba(0, 255, 136, 0.2)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 0 30px rgba(0, 255, 136, 0.1), inset 0 0 30px rgba(0, 255, 136, 0.05)",
      }}
    >
      {/* Background animation */}
      <motion.div
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(45deg, rgba(0,255,136,0.05), rgba(0,255,136,0.02))",
          backgroundSize: "200% 200%",
          pointerEvents: "none",
        }}
      />

      {/* Glow effect */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 10px rgba(0, 255, 136, 0.3)",
            "0 0 30px rgba(0, 255, 136, 0.5)",
            "0 0 10px rgba(0, 255, 136, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "20px",
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          marginBottom: "20px",
          color: "#888",
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        ⚡ Live Subtitle Preview
      </motion.div>

      {/* Typing text with cursor */}
      <div style={{ position: "relative", zIndex: 1, minHeight: "60px" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "20px",
            lineHeight: "1.6",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              display: "inline-block",
              width: "2px",
              height: "24px",
              background: "#00ff88",
              marginLeft: "4px",
              verticalAlign: "middle",
            }}
          />
        </motion.div>
      </div>

      {/* Subtitle counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: "20px",
          fontSize: "11px",
          color: "#666",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {subtitles.map((_, index) => (
          <motion.div
            key={index}
            animate={{
              scale: index === currentSubtitleIndex ? 1.3 : 1,
              background: index === currentSubtitleIndex ? "#00ff88" : "#444",
            }}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrentSubtitleIndex(index);
              setDisplayedText("");
              setIsTyping(true);
            }}
          />
        ))}
      </motion.div>

      {/* Status indicator */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#00ff88",
          boxShadow: "0 0 10px rgba(0, 255, 136, 0.8)",
        }}
      />
    </motion.div>
  );
}
