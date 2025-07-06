import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiCreditCard, FiMapPin, FiPhone, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart, calculateTotal } = useCart() || { cart: { items: [] } };
    const { placeOrder } = useOrder() || {};
    const { darkMode } = useTheme();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'cash',
        specialInstructions: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = [];
        
        if (!formData.name.trim()) {
            errors.push('Name is required');
        }
        
        // Validate phone number (10 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length !== 10) {
            errors.push('Phone number must be 10 digits');
        }
        
        if (!formData.address.trim()) {
            errors.push('Delivery address is required');
        }
        
        if (!['cash', 'card', 'upi'].includes(formData.paymentMethod.toLowerCase())) {
            errors.push('Invalid payment method');
        }
        
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate cart
            if (!cart?.items?.length) {
                toast.error('Your cart is empty');
                setLoading(false);
                return;
            }

            // Validate form
            const validationErrors = validateForm();
            if (validationErrors.length > 0) {
                validationErrors.forEach(error => toast.error(error));
                setLoading(false);
                return;
            }

            // Create order object
            const orderDetails = {
                items: cart.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: calculateTotal(),
                customerDetails: {
                    name: formData.name.trim(),
                    phone: formData.phone.replace(/\D/g, ''),
                    address: formData.address.trim(),
                    paymentMethod: formData.paymentMethod.toLowerCase(),
                    specialInstructions: formData.specialInstructions.trim()
                }
            };

            // Place order
            const order = await placeOrder(orderDetails);
            
            if (order) {
                // Clear cart
                clearCart();
                
                // Show success message
                toast.success('Order placed successfully!');
                
                // Redirect to order tracking
                navigate(`/order-tracking/${order._id}`);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!cart?.items?.length) {
        return (
            <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => navigate('/menu')}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                    >
                        View Menu
                    </button>
                </div>
            </div>
        );
    }

    const total = calculateTotal() || 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
        >
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                    
                    {/* Order Summary */}
                    <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        {cart?.items?.map((item) => (
                            <div key={item.id} className="flex justify-between items-center mb-2">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t mt-4 pt-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="flex items-center gap-2 mb-2">
                                <FiUser />
                                <span>Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-800' : 'bg-white'
                                } border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 mb-2">
                                <FiPhone />
                                <span>Phone</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-800' : 'bg-white'
                                } border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 mb-2">
                                <FiMapPin />
                                <span>Delivery Address</span>
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows="3"
                                className={`w-full p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-800' : 'bg-white'
                                } border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 mb-2">
                                <FiCreditCard />
                                <span>Payment Method</span>
                            </label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                className={`w-full p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-800' : 'bg-white'
                                } border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                            >
                                <option value="cash">Cash on Delivery</option>
                                <option value="card">Card Payment</option>
                                <option value="upi">UPI</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 mb-2">
                                <span>Special Instructions</span>
                            </label>
                            <textarea
                                name="specialInstructions"
                                value={formData.specialInstructions}
                                onChange={handleInputChange}
                                rows="3"
                                className={`w-full p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-800' : 'bg-white'
                                } border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg bg-orange-500 text-white font-semibold 
                                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </motion.button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default Checkout;
