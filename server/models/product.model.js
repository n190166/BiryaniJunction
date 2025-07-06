const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Veg Biryani', 'Non-Veg Biryani', 'Regional Biryani']
    },
    spiceLevel: {
        type: String,
        required: true,
        enum: ['mild', 'medium', 'spicy', 'extra_spicy']
    },
    isVegetarian: {
        type: Boolean,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    preparationTime: {
        type: Number,
        required: true
    },
    servingSize: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    reviews: [reviewSchema],
    ratings: [{
        type: Number,
        min: 1,
        max: 5
    }],
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Calculate average rating before saving
productSchema.pre('save', function(next) {
    if (this.ratings.length > 0) {
        this.averageRating = this.ratings.reduce((acc, curr) => acc + curr, 0) / this.ratings.length;
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
