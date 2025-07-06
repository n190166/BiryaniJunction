const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/order.controller');
const { authenticate, isAdmin } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create order
router.post('/', [
    body('items').isArray().withMessage('Items must be an array'),
    body('items.*.product').isMongoId().withMessage('Invalid product ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('items.*.price').isNumeric().withMessage('Price must be a number'),
    body('deliveryAddress').isObject().withMessage('Delivery address is required'),
    body('deliveryAddress.street').trim().notEmpty().withMessage('Street is required'),
    body('deliveryAddress.city').trim().notEmpty().withMessage('City is required'),
    body('deliveryAddress.state').trim().notEmpty().withMessage('State is required'),
    body('deliveryAddress.zipCode').trim().notEmpty().withMessage('Zip code is required'),
    body('paymentMethod').isIn(['cod', 'upi']).withMessage('Invalid payment method'),
    body('totalAmount').isNumeric().withMessage('Total amount must be a number'),
    validateRequest
], orderController.createOrder);

// Get user's orders
router.get('/my-orders', orderController.getUserOrders);

// Get specific order
router.get('/:id', orderController.getOrderById);

// Admin routes
router.use(isAdmin);

// Update order status
router.patch('/:id/status', [
    body('status').isIn(['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'])
        .withMessage('Invalid order status'),
    validateRequest
], orderController.updateOrderStatus);

// Get all orders (admin only)
router.get('/', orderController.getAllOrders);

module.exports = router;
