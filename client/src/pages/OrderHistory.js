import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import {
    ClockIcon,
    TruckIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

const statusIcons = {
    pending: ClockIcon,
    processing: TruckIcon,
    delivered: CheckCircleIcon,
    cancelled: XCircleIcon,
};

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status === filter);

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                            <div className="flex space-x-2">
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                                >
                                    <option value="all">All Orders</option>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No orders found</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredOrders.map((order) => {
                                    const StatusIcon = statusIcons[order.status];
                                    return (
                                        <div
                                            key={order._id}
                                            className="bg-white border rounded-lg overflow-hidden"
                                        >
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Order placed on{' '}
                                                            {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            Order #{order._id}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <StatusIcon className={`h-5 w-5 ${statusColors[order.status].split(' ')[1]} mr-2`} />
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="border-t border-gray-200 mt-4 pt-4">
                                                    {order.items.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center py-2"
                                                        >
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="h-16 w-16 object-cover rounded"
                                                            />
                                                            <div className="ml-4 flex-1">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {item.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    Quantity: {item.quantity}
                                                                </p>
                                                            </div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                ₹{item.price * item.quantity}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="border-t border-gray-200 mt-4 pt-4">
                                                    <div className="flex justify-between text-sm">
                                                        <p className="font-medium text-gray-900">Total</p>
                                                        <p className="font-medium text-gray-900">
                                                            ₹{calculateTotal(order.items)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex justify-end space-x-4">
                                                    <Link
                                                        to={`/orders/${order._id}`}
                                                        className="inline-flex items-center px-4 py-2 border border-orange-600 text-sm font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                                    >
                                                        View Details
                                                    </Link>
                                                    {order.status === 'delivered' && (
                                                        <Link
                                                            to={`/review/${order._id}`}
                                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                                        >
                                                            Write Review
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
