const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Add debug logging
        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/biryani-junction');

        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/biryani-junction', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        });

        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
        
        // Test the connection by checking the readyState
        const readyState = mongoose.connection.readyState;
        console.log('Connection ready state:', readyState);
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

        // Listen for connection errors
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected');
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
