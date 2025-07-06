const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item name is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    }
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    items: {
        type: [orderItemSchema],
        required: [true, 'Order must contain items'],
        validate: {
            validator: function(items) {
                return items && items.length > 0;
            },
            message: 'Order must contain at least one item'
        }
    },
    total: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount cannot be negative']
    },
    deliveryAddress: {
        type: String,
        required: [true, 'Delivery address is required'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['cash', 'card', 'upi'],
            message: 'Payment method must be cash, card, or upi'
        },
        default: 'cash'
    },
    specialInstructions: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
            message: 'Invalid order status'
        },
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
