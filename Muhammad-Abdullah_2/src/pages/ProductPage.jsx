import { motion } from "framer-motion";
import Features from "../components/product/Features";
import LiveSubtitle from "../components/product/LiveSubtitle";
import ProductRotation from "../components/product/ProductRotation";
import Specs from "../components/product/Specs";

export default function ProductPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="section" id="product">
      <motion.div
        className="container-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h2 className="gradient-text mb-3">EchoSee Smart Glasses</h2>
          <p className="text-lg text-muted">
            Revolutionary AI-powered wearable for real-time communication
          </p>
        </motion.div>

        {/* Product Rotation */}
        <motion.div variants={itemVariants}>
          <ProductRotation />
        </motion.div>

        {/* Features */}
        <motion.section className="mt-8 mb-8" variants={itemVariants}>
          <h3 className="text-center mb-6">Key Features</h3>
          <Features />
        </motion.section>

        {/* Live Subtitle */}
        <motion.section className="mt-8 mb-8" variants={itemVariants}>
          <LiveSubtitle />
        </motion.section>

        {/* Specs */}
        <motion.section variants={itemVariants}>
          <Specs />
        </motion.section>
      </motion.div>
    </div>
  );
}
