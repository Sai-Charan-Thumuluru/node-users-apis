const globalErrorHandler = (error, req, res, next) => {
    try {
        const statusCode = error.statusCode || 500;
        const errorResponse = {
            message: `Some error!`,
            errorStack: error.stack
        };

        console.error(errorResponse);
        res.status(statusCode).json(errorResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error from global error handler`, errorStack: error.stack });
    }
};

export default globalErrorHandler;