import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-hot-toast';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { placeOrder } = useOrder();
    const { isAuthenticated } = useAuth();
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'cash',
        specialInstructions: ''
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.error('Please login to place an order');
            navigate('/login');
            return;
        }

        if (!cartItems || cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        // Validate form data
        if (!formData.address?.trim()) {
            toast.error('Delivery address is required');
            return;
        }

        if (!formData.phone?.trim() || !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            toast.error('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);

        try {
            // Format cart items
            const formattedItems = cartItems.map(item => ({
                name: String(item.name),
                quantity: parseInt(item.quantity, 10),
                price: parseFloat(item.price)
            }));

            // Calculate total
            const total = formattedItems.reduce((sum, item) => 
                sum + (item.price * item.quantity), 0
            );

            const orderData = {
                items: formattedItems,
                total: parseFloat(total.toFixed(2)),
                deliveryAddress: formData.address.trim(),
                phoneNumber: formData.phone.replace(/\D/g, ''),
                paymentMethod: (formData.paymentMethod || 'cash').toLowerCase(),
                specialInstructions: formData.specialInstructions?.trim() || ''
            };

            console.log('Submitting order with data:', orderData); // Debug log
            const order = await placeOrder(orderData);
            
            if (order) {
                clearCart();
                toast.success('Order placed successfully!');
                navigate(`/order-tracking/${order._id}`);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className={`min-h-screen py-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                        <p className="mb-8">Add some delicious items to your cart!</p>
                        <button
                            onClick={() => navigate('/menu')}
                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            Browse Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen py-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    {/* Cart Items */}
                    <div className="mb-8 lg:mb-0">
                        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-4 rounded-lg shadow-md ${
                                        darkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span>₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-orange-100 text-orange-800">
                            <div className="flex justify-between items-center font-semibold">
                                <span>Total Amount</span>
                                <span>₹{getCartTotal()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Form */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 rounded-lg border ${
                                        darkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-300'
                                    }`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 rounded-lg border ${
                                        darkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-300'
                                    }`}
                                    placeholder="10-digit mobile number"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Delivery Address *
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 rounded-lg border ${
                                        darkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-300'
                                    }`}
                                    rows="3"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Payment Method
                                </label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 rounded-lg border ${
                                        darkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-300'
                                    }`}
                                >
                                    <option value="cash">Cash on Delivery</option>
                                    <option value="card">Card</option>
                                    <option value="upi">UPI</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Special Instructions
                                </label>
                                <textarea
                                    name="specialInstructions"
                                    value={formData.specialInstructions}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 rounded-lg border ${
                                        darkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-300'
                                    }`}
                                    rows="2"
                                    placeholder="Any special instructions for delivery"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-lg bg-orange-600 text-white font-medium
                                    hover:bg-orange-700 transition-colors ${
                                        loading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Place Order'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
