import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BellIcon, LockClosedIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Settings() {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        emailNotifications: user?.settings?.emailNotifications ?? true,
        smsNotifications: user?.settings?.smsNotifications ?? true,
        orderUpdates: user?.settings?.orderUpdates ?? true,
        promotionalEmails: user?.settings?.promotionalEmails ?? true,
        language: user?.settings?.language ?? 'en',
        currency: user?.settings?.currency ?? 'INR',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSettingChange = (e) => {
        const { name, type, checked, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const saveSettings = async () => {
        setLoading(true);
        try {
            const response = await axios.put('/api/users/settings', settings);
            await updateUser({ ...user, settings: response.data });
            toast.success('Settings updated successfully');
        } catch (error) {
            console.error('Error updating settings:', error);
            toast.error('Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await axios.put('/api/users/change-password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            toast.success('Password changed successfully');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 space-y-8">
                        {/* Notifications Section */}
                        <div>
                            <div className="flex items-center">
                                <BellIcon className="h-6 w-6 text-gray-400" />
                                <h3 className="ml-2 text-lg font-medium text-gray-900">
                                    Notifications
                                </h3>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="emailNotifications"
                                            name="emailNotifications"
                                            type="checkbox"
                                            checked={settings.emailNotifications}
                                            onChange={handleSettingChange}
                                            className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                                            Email notifications
                                        </label>
                                        <p className="text-sm text-gray-500">Receive order updates via email</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="smsNotifications"
                                            name="smsNotifications"
                                            type="checkbox"
                                            checked={settings.smsNotifications}
                                            onChange={handleSettingChange}
                                            className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label htmlFor="smsNotifications" className="text-sm font-medium text-gray-700">
                                            SMS notifications
                                        </label>
                                        <p className="text-sm text-gray-500">Receive order updates via SMS</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="promotionalEmails"
                                            name="promotionalEmails"
                                            type="checkbox"
                                            checked={settings.promotionalEmails}
                                            onChange={handleSettingChange}
                                            className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label htmlFor="promotionalEmails" className="text-sm font-medium text-gray-700">
                                            Promotional emails
                                        </label>
                                        <p className="text-sm text-gray-500">Receive offers and updates about new items</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Localization Section */}
                        <div>
                            <div className="flex items-center">
                                <GlobeAltIcon className="h-6 w-6 text-gray-400" />
                                <h3 className="ml-2 text-lg font-medium text-gray-900">
                                    Language and Region
                                </h3>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Language
                                    </label>
                                    <select
                                        name="language"
                                        value={settings.language}
                                        onChange={handleSettingChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                                    >
                                        <option value="en">English</option>
                                        <option value="hi">Hindi</option>
                                        <option value="te">Telugu</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Currency
                                    </label>
                                    <select
                                        name="currency"
                                        value={settings.currency}
                                        onChange={handleSettingChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                                    >
                                        <option value="INR">Indian Rupee (₹)</option>
                                        <option value="USD">US Dollar ($)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Password Change Section */}
                        <div>
                            <div className="flex items-center">
                                <LockClosedIcon className="h-6 w-6 text-gray-400" />
                                <h3 className="ml-2 text-lg font-medium text-gray-900">
                                    Change Password
                                </h3>
                            </div>
                            <form onSubmit={changePassword} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                    >
                                        {loading ? 'Changing Password...' : 'Change Password'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Save Settings Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={saveSettings}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                {loading ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
