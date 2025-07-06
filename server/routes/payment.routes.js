const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { authenticate } = require('../middleware/auth');

// Create payment intent
router.post('/create-payment-intent', authenticate, function(req, res) {
    const { amount } = req.body;

    stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: 'inr',
        metadata: { integration_check: 'accept_a_payment' }
    })
    .then(paymentIntent => {
        res.json({ clientSecret: paymentIntent.client_secret });
    })
    .catch(error => {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    });
});

module.exports = router;
