import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { IMAGES } from '../constants/images';

const teamMembers = [
    {
        name: 'Chef Rajesh Kumar',
        role: 'Head Chef',
        image: IMAGES.TEAM_MEMBER_1,
        description: 'With over 20 years of experience in authentic Hyderabadi cuisine.'
    },
    {
        name: 'Sarah Mathew',
        role: 'Restaurant Manager',
        image: IMAGES.TEAM_MEMBER_2,
        description: 'Ensuring the best dining experience for our valued customers.'
    },
    {
        name: 'Chef Ahmed Ali',
        role: 'Biryani Specialist',
        image: IMAGES.TEAM_MEMBER_3,
        description: 'Master of traditional biryani preparation techniques.'
    }
];

const values = [
    {
        title: 'Authentic Taste',
        description: 'We preserve the traditional Hyderabadi flavors in every dish.'
    },
    {
        title: 'Quality Ingredients',
        description: 'Only the finest and freshest ingredients make it to our kitchen.'
    },
    {
        title: 'Customer Satisfaction',
        description: 'Your satisfaction is our top priority.'
    }
];

export default function About() {
    const { darkMode } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        >
            {/* Hero Section */}
            <div className="relative h-[50vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={IMAGES.SPICES}
                        alt="Indian Spices"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center px-4">
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-4"
                        >
                            Our Story
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-200 max-w-2xl mx-auto"
                        >
                            Bringing authentic Hyderabadi flavors to your table since 2010
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
                        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Founded in 2010, Biryani Junction began with a simple mission: to serve authentic Hyderabadi biryani that reminds people of home. Our recipes have been passed down through generations, preserving the authentic taste and cooking techniques.
                        </p>
                        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            What started as a small family restaurant has now grown into a beloved destination for biryani enthusiasts. We take pride in maintaining the same quality and taste that we started with, while continuously innovating to serve you better.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative h-[400px] rounded-lg overflow-hidden"
                    >
                        <img
                            src={IMAGES.BIRYANI_1}
                            alt="Our Signature Biryani"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Values Section */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} py-16`}>
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                            >
                                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className={`text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg overflow-hidden`}
                        >
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                <p className="text-orange-500 mb-4">{member.role}</p>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                    {member.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
