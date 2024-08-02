import Image from 'next/image';
import React from 'react';
import { FaBoxOpen, FaArrowRight, FaLinkedin, FaInstagram } from 'react-icons/fa';

const UseCaseSection = () => {
    return (
        <section className="">
            <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <p className='text-sm'>Use Case</p>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
                        Social media automation. More engagement in more places.
                    </h1>
                    <p className="text-gray-500 mb-6 lg:text-xl dark:text-gray-400">
                        Social media is a beast that never sleeps, but neither do automated social media management tools.
                        Make helps you connect all of your social tools in one central place where replies, comments, posts,
                        and more are generated and published automatically. With Make, managing growing follower engagement
                        across multiple channels is a breeze.
                    </p>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        {/* Each icon with a line connection */}
                        <div className="relative flex items-center text-blue-600">
                            <FaBoxOpen className="text-2xl" />
                            {/* <div className="absolute top-1/2 right-0 mr-4 w-12 h-px bg-blue-600 transform translate-x-1/2"></div> */}
                        </div>
                        <FaArrowRight className="text-2xl text-blue-600" />
                        <div className="relative flex items-center text-blue-600">
                            {/* <div className="absolute top-1/2 left-0 ml-4 w-12 h-px bg-blue-600 transform -translate-x-1/2"></div> */}
                            <FaLinkedin className="text-2xl" />
                            {/* <div className="absolute top-1/2 right-0 mr-4 w-12 h-px bg-blue-600 transform translate-x-1/2"></div> */}
                        </div>
                        <FaInstagram className="text-2xl text-pink-500" />
                    </div>
                    <div className="text-center">
                        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                            Discover Solutions
                        </button>
                    </div>
                </div>
                <div className="hidden lg:col-span-5 lg:flex">
                    <Image src="/usecase.png" alt="Feature illustration" width={900} height={400} quality={70} />
                </div>
            </div>
        </section>
    );
};

export default UseCaseSection;
