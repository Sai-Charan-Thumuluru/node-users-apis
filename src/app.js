import express from 'express';
import globalErrorHandler from './middleware/global-error-handler.js';
// import userRoutes from './routes/user-routes.js';

const app = express();

app.use(express.json());

// app.use('/api/users', userRoutes);

app.use(globalErrorHandler);

export default app;