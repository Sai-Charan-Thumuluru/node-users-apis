import _conf from './config/config.js';
import { connectDB, disconnectDB } from './config/db.js';
import app from './app.js';

const port = _conf.port || 3000;

app.get('/', (req, res) => {
    res.send(`<h1> Hello world </h1>`);
});

const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server started at ${port}`);
    });
}

startServer();

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