"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa';

const WorkflowAutomationSection = () => {
    return (
        <div className="mt-10">
            <div className="grid items-center justify-center p-4 gap-4">
                <h2 className='text-5xl font-bold text-center'>More than no-code workflow automation</h2>
                <p className='text-center font-mono'>
                    Traditional no-code iPaaS platforms are linear and non-intuitive. Make allows you to visually create, build, and automate without limits.
                </p>
            </div>
            <div className="relative h-screen flex items-center justify-center">
                {/* Background animated shapes */}
                <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4
                    }}
                    className="absolute w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                />
                <motion.div
                    initial={{ scale: 0.5, x: 100 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4
                    }}
                    className="absolute w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                />
                <motion.div
                    initial={{ scale: 0.5, x: -100, y: 50 }}
                    animate={{ scale: 1, x: 0, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4
                    }}
                    className="absolute w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                />
                {/* Play button */}
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="z-10">
                    {/* <FaPlayCircle className="text-white text-9xl cursor-pointer" /> */}
                    <a href='/'>
                        <Image src={'/image.png'} width={1000} height={100} alt='tet' />
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default WorkflowAutomationSection;
