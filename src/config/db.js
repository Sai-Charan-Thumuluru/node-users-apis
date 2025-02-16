import mongoose from 'mongoose';
import _conf from './config.js';

const connectDB = async () => {
    try {
        const mongoDBUri = _conf.mongodbUri;
        await mongoose.connect(mongoDBUri);
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
}

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(`Error disconnecting from MongoDB: ${error}`);
    }
}

(() => {
    mongoose.connection.on('connecting', () => {
        console.log('Connecting to MongoDB');
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });

    mongoose.connection.on('error', (error) => {
        console.log(`MongoDB connection error: ${error}`);
    });
})();

export { connectDB, disconnectDB };