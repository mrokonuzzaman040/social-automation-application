"use client";
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
    return (
        <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{
                background: 'linear-gradient(135deg, #000000, #4b0082)',
            }}
        >
            {/* Add motion elements or shapes for animation */}
            <motion.div
                className="absolute rounded-full bg-purple-900 opacity-50"
                style={{ width: 200, height: 200 }}
                animate={{
                    scale: [1, 1.5, 1],
                    x: ['0%', '50%', '100%'],
                    y: ['0%', '50%', '0%'],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </motion.div>
    );
};

export default BackgroundAnimation;
