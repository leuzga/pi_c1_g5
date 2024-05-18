import { motion } from 'framer-motion';

const BouncyAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 20,
        duration: 2,
      }}
    >
      {children}
    </motion.div>
  );
};

export default BouncyAnimation;
