import express from 'express'
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

const app = express();
config()
const port = process.env.PORT || 3000;
await connectDB();

app.get('/', (req, res) => {
    res.send(`<h1> Hello world </h1>`);
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

const gracefulShutDown = async (signal) => {
    try {
        await disconnectDB();
        console.log(`Recieved ${signal}, shutting down gracefully`);
        process.exit(0);
    } catch (error) {
        console.log(`Error during graceful shutdown ${error}`);
        process.exit(1);
    }
}

process.on('SIGINT', () => gracefulShutDown('SIGINT'));
process.on('SIGTERM', () => gracefulShutDown('SIGTERM'));