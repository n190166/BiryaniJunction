const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/product.controller');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Protected routes
router.use(authenticate);

// Add rating
router.post('/:id/rate', [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('review').optional().trim().isLength({ min: 3 })
], productController.addRating);

// Admin routes
router.use(isAdmin);

// Create product
router.post('/', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').isIn(['veg', 'non-veg', 'special']).withMessage('Invalid category'),
    body('ingredients').isArray().withMessage('Ingredients must be an array'),
    body('preparationTime').isInt({ min: 1 }).withMessage('Preparation time must be positive'),
    body('servingSize').trim().notEmpty().withMessage('Serving size is required')
], productController.createProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
