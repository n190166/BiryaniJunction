const express = require('express');
const { body } = require('express-validator');
const cartController = require('../controllers/cart.controller');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get user's cart
router.get('/', cartController.getCart);

// Add item to cart
router.post('/items', [
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], cartController.addToCart);

// Update item quantity
router.patch('/items/:productId', [
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], cartController.updateCartItemQuantity);

// Remove item from cart
router.delete('/items/:productId', cartController.removeFromCart);

// Clear cart
router.delete('/', cartController.clearCart);

module.exports = router;
