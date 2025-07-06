import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants/images';

const features = [
    {
        title: 'Authentic Hyderabadi Biryani',
        description: 'Experience the true taste of Hyderabad with our signature biryani recipes.',
        image: IMAGES.BIRYANI_1,
        alt: 'Hyderabadi Biryani'
    },
    {
        title: 'Fresh Ingredients',
        description: 'We use only the finest and freshest ingredients in all our dishes.',
        image: IMAGES.KITCHEN,
        alt: 'Fresh Ingredients'
    },
    {
        title: 'Expert Chefs',
        description: 'Our master chefs bring years of experience in authentic Indian cuisine.',
        image: IMAGES.RESTAURANT_INTERIOR,
        alt: 'Expert Chefs'
    }
];

export default function Home() {
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        >
            {/* Hero Section */}
            <div className="relative h-[80vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={IMAGES.RESTAURANT_EXTERIOR}
                        alt="Biryani Junction Restaurant"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center px-4">
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                        >
                            Welcome to Biryani Junction
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                        >
                            Experience the authentic taste of Hyderabadi cuisine
                        </motion.p>
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/menu')}
                            className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
                        >
                            Order Now
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={feature.image}
                                    alt={feature.alt}
                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Special Offers Section */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} py-16`}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold">Special Offers</h2>
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                Enjoy our special weekend offers and family combo meals. 
                                Perfect for gatherings and celebrations.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <span className="text-orange-500 mr-2">✓</span>
                                    <span>20% off on Family Packs</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-orange-500 mr-2">✓</span>
                                    <span>Free delivery on orders above ₹999</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-orange-500 mr-2">✓</span>
                                    <span>Special weekend discounts</span>
                                </li>
                            </ul>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/menu')}
                                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                View Menu
                            </motion.button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative h-[400px] rounded-lg overflow-hidden"
                        >
                            <img
                                src={IMAGES.BIRYANI_2}
                                alt="Special Biryani"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
