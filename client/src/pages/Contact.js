import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useContact } from '../contexts/ContactContext';
import { FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Contact() {
    const { darkMode } = useTheme();
    const { submitContact, loading } = useContact();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitContact(formData);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Failed to submit contact form:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        >
            <div className="container mx-auto px-4 py-16">
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-4xl font-bold text-center mb-12"
                >
                    Contact Us
                </motion.h1>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ x: -50 }}
                        animate={{ x: 0 }}
                        className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 shadow-xl' : 'bg-gray-100'}`}
                    >
                        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <span className={`text-orange-500 text-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} p-2 rounded-full`}>
                                        {item.icon}
                                    </span>
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Media Links */}
                        <div className="mt-8">
                            <h3 className="font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        className={`text-2xl p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    >
                                        {link.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ x: 50 }}
                        animate={{ x: 0 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label 
                                    htmlFor="name" 
                                    className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                        darkMode 
                                            ? 'bg-gray-800 border-gray-700 text-white' 
                                            : 'bg-white border-gray-300'
                                    }`}
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label 
                                    htmlFor="email" 
                                    className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                        darkMode 
                                            ? 'bg-gray-800 border-gray-700 text-white' 
                                            : 'bg-white border-gray-300'
                                    }`}
                                    placeholder="Your email"
                                />
                            </div>
                            <div>
                                <label 
                                    htmlFor="subject" 
                                    className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                        darkMode 
                                            ? 'bg-gray-800 border-gray-700 text-white' 
                                            : 'bg-white border-gray-300'
                                    }`}
                                    placeholder="Message subject"
                                />
                            </div>
                            <div>
                                <label 
                                    htmlFor="message" 
                                    className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                        darkMode 
                                            ? 'bg-gray-800 border-gray-700 text-white' 
                                            : 'bg-white border-gray-300'
                                    }`}
                                    placeholder="Your message"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-lg transition-colors ${
                                    darkMode 
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

const contactInfo = [
    {
        icon: <FaMapMarkerAlt />,
        title: 'Address',
        content: 'Rajahmundry, Andhra Pradesh, India'
    },
    {
        icon: <FaPhone />,
        title: 'Phone',
        content: '+91 9059259395'
    },
    {
        icon: <FaEnvelope />,
        title: 'Email',
        content: 'yaminisrikrishnaveniilla@gmail.com'
    },
    {
        icon: <FaClock />,
        title: 'Hours',
        content: 'Mon-Sun: 11:00 AM - 10:00 PM'
    }
];

const socialLinks = [
    {
        icon: <FaInstagram className="text-orange-500" />,
        url: 'https://www.instagram.com/yaminisrikrishnaveniilla?igsh=ajAxdzNvaWd5b3hy'
    }
];
