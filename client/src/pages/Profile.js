import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
    UserIcon,
    ShoppingBagIcon,
    StarIcon,
    CogIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';

const tabs = [
    { name: 'Profile', icon: UserIcon, href: '#profile' },
    { name: 'Orders', icon: ShoppingBagIcon, href: '#orders' },
    { name: 'Reviews', icon: StarIcon, href: '#reviews' },
    { name: 'Settings', icon: CogIcon, href: '#settings' },
    { name: 'Address', icon: MapPinIcon, href: '#address' },
];

export default function Profile() {
    const { user, updateProfile, isAuthenticated, loading } = useAuth();
    const { darkMode } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditing(true);

        try {
            await updateProfile(formData);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || ''
        });
        setIsEditing(false);
    };

    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen py-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 md:p-8`}>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Profile Settings</h1>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`
                                    w-full px-4 py-2 rounded-lg border 
                                    ${darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }
                                    ${!isEditing && 'opacity-75'}
                                    focus:outline-none focus:ring-2 focus:ring-orange-500
                                `}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`
                                    w-full px-4 py-2 rounded-lg border 
                                    ${darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }
                                    ${!isEditing && 'opacity-75'}
                                    focus:outline-none focus:ring-2 focus:ring-orange-500
                                `}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`
                                    w-full px-4 py-2 rounded-lg border 
                                    ${darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }
                                    ${!isEditing && 'opacity-75'}
                                    focus:outline-none focus:ring-2 focus:ring-orange-500
                                `}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows="3"
                                className={`
                                    w-full px-4 py-2 rounded-lg border 
                                    ${darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }
                                    ${!isEditing && 'opacity-75'}
                                    focus:outline-none focus:ring-2 focus:ring-orange-500
                                `}
                            />
                        </div>

                        {isEditing && (
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    disabled={isEditing}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`
                                        px-4 py-2 bg-orange-600 text-white rounded-lg 
                                        hover:bg-orange-700 transition-colors
                                        ${isEditing ? 'opacity-75 cursor-not-allowed' : ''}
                                    `}
                                    disabled={isEditing}
                                >
                                    {isEditing ? 'Updating...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </form>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Link
                            to="/orders"
                            className={`p-4 rounded-lg border ${
                                darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                            } transition-colors`}
                        >
                            <div className="flex items-center">
                                <ShoppingBagIcon className="h-6 w-6 text-orange-600" />
                                <span className="ml-3 text-lg font-medium">My Orders</span>
                            </div>
                        </Link>

                        <Link
                            to="/reviews"
                            className={`p-4 rounded-lg border ${
                                darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                            } transition-colors`}
                        >
                            <div className="flex items-center">
                                <StarIcon className="h-6 w-6 text-orange-600" />
                                <span className="ml-3 text-lg font-medium">My Reviews</span>
                            </div>
                        </Link>

                        <Link
                            to="/addresses"
                            className={`p-4 rounded-lg border ${
                                darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                            } transition-colors`}
                        >
                            <div className="flex items-center">
                                <MapPinIcon className="h-6 w-6 text-orange-600" />
                                <span className="ml-3 text-lg font-medium">My Addresses</span>
                            </div>
                        </Link>

                        <Link
                            to="/settings"
                            className={`p-4 rounded-lg border ${
                                darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                            } transition-colors`}
                        >
                            <div className="flex items-center">
                                <CogIcon className="h-6 w-6 text-orange-600" />
                                <span className="ml-3 text-lg font-medium">Settings</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
