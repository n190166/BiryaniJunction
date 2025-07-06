import React, { createContext, useContext, useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const OrderContext = createContext();

export function useOrder() {
    return useContext(OrderContext);
}

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    const placeOrder = async (orderData) => {
        if (!isAuthenticated) {
            toast.error('Please login to place an order');
            return null;
        }

        try {
            // Validate order data before sending
            if (!orderData.items?.length) {
                throw new Error('Order must contain items');
            }

            if (!orderData.deliveryAddress) {
                throw new Error('Delivery address is required');
            }

            if (!orderData.phoneNumber || !/^[0-9]{10}$/.test(orderData.phoneNumber)) {
                throw new Error('Valid 10-digit phone number is required');
            }

            console.log('Sending order to server:', orderData);
            const response = await axios.post('/orders', orderData);
            console.log('Server response:', response.data);

            if (response.data.success) {
                const newOrder = response.data.order;
                setOrders(prevOrders => [...prevOrders, newOrder]);
                setCurrentOrder(newOrder);
                return newOrder;
            } else {
                throw new Error(response.data.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Order placement error:', error);
            
            // Get the most specific error message available
            const errorMessage = error.response?.data?.message 
                || error.message 
                || 'Failed to place order';
            
            toast.error(errorMessage);
            throw error;
        }
    };

    const getOrderStatus = async (orderId) => {
        try {
            const response = await axios.get(`/orders/${orderId}`);
            if (response.data.success) {
                return response.data.order;
            }
            throw new Error(response.data.message || 'Failed to fetch order');
        } catch (error) {
            console.error('Error fetching order status:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch order status');
            return null;
        }
    };

    const getAllOrders = async () => {
        try {
            const response = await axios.get('/orders');
            if (response.data.success) {
                setOrders(response.data.orders);
                return response.data.orders;
            }
            throw new Error(response.data.message || 'Failed to fetch orders');
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch orders');
            return [];
        }
    };

    const value = {
        orders,
        currentOrder,
        loading,
        placeOrder,
        getOrderStatus,
        getAllOrders
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}
