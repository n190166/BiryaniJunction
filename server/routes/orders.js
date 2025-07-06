const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// @route   POST /orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        // Log the incoming request
        console.log('Received order request body:', JSON.stringify(req.body, null, 2));
        console.log('User ID from token:', req.user.id);

        const { items, total, deliveryAddress, phoneNumber, paymentMethod, specialInstructions } = req.body;

        // Validate required fields with detailed logging
        if (!items || !Array.isArray(items) || items.length === 0) {
            console.log('Invalid items:', items);
            return res.status(400).json({
                success: false,
                message: 'Order must contain valid items array'
            });
        }

        if (!deliveryAddress) {
            console.log('Missing delivery address');
            return res.status(400).json({
                success: false,
                message: 'Delivery address is required'
            });
        }

        if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
            console.log('Invalid phone number:', phoneNumber);
            return res.status(400).json({
                success: false,
                message: 'Valid 10-digit phone number is required'
            });
        }

        // Log the items structure
        console.log('Processing items:', JSON.stringify(items, null, 2));

        // Create order object with validation
        const orderData = {
            user: req.user.id,
            items: items.map(item => {
                if (!item.name || !item.quantity || !item.price) {
                    console.log('Invalid item data:', item);
                    throw new Error('Each item must have name, quantity, and price');
                }
                return {
                    name: String(item.name),
                    quantity: Number(item.quantity),
                    price: Number(item.price)
                };
            }),
            total: Number(total),
            deliveryAddress: deliveryAddress.trim(),
            phoneNumber: phoneNumber.replace(/\D/g, ''),
            status: 'pending'
        };

        // Add optional fields
        if (paymentMethod) {
            orderData.paymentMethod = paymentMethod.toLowerCase();
        }
        if (specialInstructions) {
            orderData.specialInstructions = specialInstructions.trim();
        }

        console.log('Creating order with data:', JSON.stringify(orderData, null, 2));

        // Create and save order
        const order = new Order(orderData);
        const savedOrder = await order.save();

        console.log('Order saved successfully:', JSON.stringify(savedOrder, null, 2));

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: savedOrder
        });

    } catch (error) {
        console.error('Order creation error:', error);
        
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            console.log('Mongoose validation errors:', validationErrors);
            return res.status(400).json({
                success: false,
                message: validationErrors.join(', ')
            });
        }

        // Log the full error details
        console.error('Full error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });

        res.status(500).json({
            success: false,
            message: error.message || 'Error creating order'
        });
    }
});

// @route   GET /orders
// @desc    Get all orders for a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        console.log('Received request to fetch orders for user:', req.user.id);
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        console.log('Fetched orders:', orders);

        res.json({
            success: true,
            orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders'
        });
    }
});

// @route   GET /orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        console.log('Received request to fetch order with ID:', req.params.id);
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        
        if (!order) {
            console.log('Order not found:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        console.log('Fetched order:', order);

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order'
        });
    }
});

module.exports = router;
