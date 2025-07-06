require('dotenv').config();
const mongoose = require('mongoose');
const menuItems = require('../data/menuItems');
const Product = require('../models/product.model');

async function seedDatabase() {
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

        // Prepare all items for insertion
        const allItems = [
            ...menuItems.vegBiryani,
            ...menuItems.nonVegBiryani,
            ...menuItems.regionalBiryani
        ];

        // Add additional fields
        const productsToInsert = allItems.map(item => ({
            ...item,
            isAvailable: true,
            ratings: [],
            reviews: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        // Insert products
        await Product.insertMany(productsToInsert);
        console.log(`Successfully seeded ${productsToInsert.length} products`);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding function
seedDatabase();
