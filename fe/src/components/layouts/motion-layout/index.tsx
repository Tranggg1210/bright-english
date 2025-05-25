import { motion } from "framer-motion";

function MotionLayout({ children, height = "100%", style }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6 }}
      style={{ height: height, width: "100%", ...style }}
    >
      {children}
    </motion.div>
  );
}

export default MotionLayout;
