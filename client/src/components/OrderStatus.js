import React from 'react';
import { motion } from 'framer-motion';
import { useOrder } from '../contexts/OrderContext';
import { FiCheckCircle, FiClock, FiTruck } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

export default function OrderStatus() {
    const { currentOrder } = useOrder();
    const { darkMode } = useTheme();

    if (!currentOrder) {
        return null;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'placed':
                return 'text-blue-500';
            case 'preparing':
                return 'text-yellow-500';
            case 'out_for_delivery':
                return 'text-orange-500';
            case 'delivered':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'placed':
                return <FiClock className="w-6 h-6" />;
            case 'preparing':
                return <FiClock className="w-6 h-6" />;
            case 'out_for_delivery':
                return <FiTruck className="w-6 h-6" />;
            case 'delivered':
                return <FiCheckCircle className="w-6 h-6" />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
        >
            <div className="flex items-center space-x-3">
                <div className={getStatusColor(currentOrder.status)}>
                    {getStatusIcon(currentOrder.status)}
                </div>
                <div>
                    <h3 className="font-semibold">Order #{currentOrder.id}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Status: {currentOrder.status.replace(/_/g, ' ').toUpperCase()}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
