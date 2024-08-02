"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDatabase } from 'react-icons/fa';

const icons = [
    { icon: <FaReact size={50} />, name: 'React' },
    { icon: <FaNodeJs size={50} />, name: 'Node.js' },
    { icon: <FaPython size={50} />, name: 'Python' },
    { icon: <FaAws size={50} />, name: 'AWS' },
    { icon: <FaDatabase size={50} />, name: 'Database' }
];

const TrustedIconsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Start automatic cycling on mount and define stopping mechanism
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveIndex((current) => (current + 1) % icons.length);
        }, 800); // Change icon every 3 seconds

        // Cleanup the interval on component unmount
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Stop cycling when hovering
    const handleMouseEnter = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    // Resume cycling when not hovering
    const handleMouseLeave = () => {
        intervalRef.current = setInterval(() => {
            setActiveIndex((current) => (current + 1) % icons.length);
        }, 3000);
    };

    return (
        <div className="m-2">
            <div className="m-2">
                <h2 className="text-xl font-bold text-center">Trusted by thousands of fast-scaling organizations around the globe
                </h2>
            </div>
            <div className="flex justify-center items-center space-x-4 p-5"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {icons.map((item, index) => (
                    <div key={index} className={`transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-20'}`}>
                        {item.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustedIconsCarousel;
