import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { menuItems } from '../data/menuItems';

const Menu = () => {
    const { addToCart, cart } = useCart();
    const { darkMode } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('biryani');

    const getItemQuantity = (itemId) => {
        if (!cart?.items) return 0;
        const item = cart.items.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    };

    const categories = [
        { id: 'biryani', name: 'Biryanis' },
        { id: 'starters', name: 'Starters' },
        { id: 'drinks', name: 'Drinks' }
    ];

    const currentItems = menuItems[selectedCategory]?.items || [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
        >
            <div className="container mx-auto px-4">
                {/* Categories Section with improved spacing */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-8">Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.map(category => (
                            <motion.div
                                key={category.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`${
                                    darkMode ? 'bg-gray-800' : 'bg-white'
                                } rounded-lg shadow-lg overflow-hidden cursor-pointer
                                ${selectedCategory === category.id ? 'ring-2 ring-orange-500' : ''}`}
                            >
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-semibold">{category.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Menu Items Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-8">{menuItems[selectedCategory].title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold">{item.name}</h3>
                                        <span className="text-orange-500 font-bold">₹{item.price}</span>
                                    </div>
                                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {item.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {getItemQuantity(item.id)} in cart
                                        </span>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => addToCart(item)}
                                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                        >
                                            Add to Cart
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Menu;
