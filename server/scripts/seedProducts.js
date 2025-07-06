require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const menuItems = require('../data/menuItems');

const seedProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Transform menu items into a flat array
        const products = [
            ...menuItems.vegBiryani.map(item => ({
                ...item,
                category: 'veg'
            })),
            ...menuItems.nonVegBiryani.map(item => ({
                ...item,
                category: 'non-veg'
            })),
            ...menuItems.regionalBiryani.map(item => ({
                ...item,
                category: 'special'
            }))
        ];

        // Insert products
        await Product.insertMany(products);
        console.log('Successfully seeded products');

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
