const Order = require('../models/Order');
const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sendEmail = require('../utils/email');

exports.createOrder = async (req, res) => {
    try {
        console.log('Received order request:', JSON.stringify(req.body, null, 2));
        console.log('User ID:', req.user?.userId);

        const { items, deliveryAddress, paymentMethod, totalAmount } = req.body;

        if (!items || !items.length) {
            return res.status(400).json({ message: 'Order must contain items' });
        }

        // Get user details
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Found user:', user.email);

        // Create order
        const orderData = {
            user: req.user.userId,
            items: items.map(item => ({
                product: item.product._id || item.product, // Handle both populated and unpopulated products
                quantity: item.quantity,
                price: item.product.price || item.price
            })),
            deliveryAddress,
            paymentMethod,
            totalAmount,
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid'
        };

        console.log('Creating order with data:', JSON.stringify(orderData, null, 2));

        const order = new Order(orderData);
        await order.save();

        console.log('Order saved successfully:', order._id);

        // Try to send email, but don't fail if it doesn't work
        try {
            await sendEmail({
                to: user.email,
                subject: 'Order Confirmation - Biryani Junction',
                template: 'orderConfirmation',
                data: { order, user }
            });
            console.log('Confirmation email sent');
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
        }

        // Send response
        res.status(201).json({
            message: 'Order created successfully',
            order: {
                _id: order._id,
                items: order.items,
                deliveryAddress: order.deliveryAddress,
                paymentMethod: order.paymentMethod,
                totalAmount: order.totalAmount,
                status: order.status,
                paymentStatus: order.paymentStatus,
                createdAt: order.createdAt
            }
        });
    } catch (error) {
        console.error('Order creation error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ 
            message: 'Failed to create order',
            error: process.env.NODE_ENV === 'development' ? {
                message: error.message,
                stack: error.stack
            } : undefined
        });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ 
            _id: req.params.id,
            user: req.user.userId 
        }).populate('items.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        // Try to send status update email
        try {
            const user = await User.findById(order.user);
            if (user) {
                await sendEmail({
                    to: user.email,
                    subject: `Order ${status} - Biryani Junction`,
                    template: 'orderStatusUpdate',
                    data: { order, user }
                });
            }
        } catch (emailError) {
            console.error('Failed to send status update email:', emailError);
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;
        const query = {};

        if (status) {
            query.status = status;
        }

        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const orders = await Order.find(query)
            .populate('user', 'name email')
            .populate('items.product')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};
