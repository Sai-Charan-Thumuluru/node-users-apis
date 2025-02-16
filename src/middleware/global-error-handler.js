const globalErrorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const errorResponse = {
        message: `Some error!`,
        errorStack: error.stack
    };

    console.error(errorResponse);
    res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;