import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    CheckCircleIcon,
    ClockIcon,
    TruckIcon,
    FireIcon
} from '@heroicons/react/24/outline';

const orderStatuses = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PREPARING: 'preparing',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered'
};

const statusSteps = [
    {
        status: orderStatuses.CONFIRMED,
        title: 'Order Confirmed',
        description: 'Your order has been confirmed',
        icon: CheckCircleIcon
    },
    {
        status: orderStatuses.PREPARING,
        title: 'Preparing',
        description: 'Your biryani is being prepared with care',
        icon: FireIcon
    },
    {
        status: orderStatuses.OUT_FOR_DELIVERY,
        title: 'Out for Delivery',
        description: 'Your order is on its way',
        icon: TruckIcon
    },
    {
        status: orderStatuses.DELIVERED,
        title: 'Delivered',
        description: 'Enjoy your meal!',
        icon: CheckCircleIcon
    }
];

export default function OrderTracking() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrder();
        // Set up real-time updates using WebSocket or polling
        const interval = setInterval(fetchOrder, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`/api/orders/${orderId}`);
            setOrder(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch order details');
            console.error('Error fetching order:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStepStatus = (stepStatus) => {
        if (!order) return 'upcoming';
        
        const statusIndex = statusSteps.findIndex(step => step.status === order.status);
        const stepIndex = statusSteps.findIndex(step => step.status === stepStatus);
        
        if (stepIndex < statusIndex) return 'complete';
        if (stepIndex === statusIndex) return 'current';
        return 'upcoming';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
                    <p className="text-gray-600">The order you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Order Header */}
                <div className="bg-white shadow rounded-lg px-6 py-8 mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Order #{order._id.slice(-6)}
                    </h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Order Date</p>
                            <p className="font-medium">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Order Status */}
                <div className="bg-white shadow rounded-lg px-6 py-8 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        Order Status
                    </h2>
                    <div className="space-y-8">
                        {statusSteps.map((step, stepIdx) => {
                            const status = getStepStatus(step.status);
                            return (
                                <div
                                    key={step.title}
                                    className="relative flex items-start"
                                >
                                    <div className="flex items-center">
                                        <span
                                            className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full ${
                                                status === 'complete'
                                                    ? 'bg-orange-600'
                                                    : status === 'current'
                                                    ? 'bg-orange-200'
                                                    : 'bg-gray-200'
                                            }`}
                                        >
                                            <step.icon
                                                className={`w-5 h-5 ${
                                                    status === 'complete'
                                                        ? 'text-white'
                                                        : status === 'current'
                                                        ? 'text-orange-600'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                        </span>
                                    </div>
                                    <div className="ml-4 min-w-0">
                                        <h3
                                            className={`text-sm font-medium ${
                                                status === 'complete'
                                                    ? 'text-orange-600'
                                                    : status === 'current'
                                                    ? 'text-gray-900'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white shadow rounded-lg px-6 py-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        Order Details
                    </h2>
                    <div className="space-y-6">
                        {/* Items */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-4">Items</h3>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div
                                        key={item.product._id}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">
                                            ₹{(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-4">
                                Delivery Details
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{order.deliveryDetails.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{order.deliveryDetails.phone}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="font-medium">{order.deliveryDetails.address}</p>
                                    </div>
                                    {order.deliveryDetails.deliveryInstructions && (
                                        <div className="col-span-2">
                                            <p className="text-sm text-gray-500">
                                                Delivery Instructions
                                            </p>
                                            <p className="font-medium">
                                                {order.deliveryDetails.deliveryInstructions}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-4">
                                Payment Details
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-500">Subtotal</p>
                                        <p className="font-medium">
                                            ₹{(order.totalAmount - 40).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-500">Delivery Fee</p>
                                        <p className="font-medium">₹40.00</p>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-2">
                                        <p className="text-sm font-medium text-gray-900">Total</p>
                                        <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
