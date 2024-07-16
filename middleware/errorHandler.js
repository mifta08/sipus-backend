// errorMiddleware.js
const { ValidationError, UniqueConstraintError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error ke console

    if (err instanceof ValidationError) {
        res.status(400).json({
            status: 'error',
            message: 'Validation error',
            details: err.errors.map(e => e.message)
        });
    } else if (err instanceof UniqueConstraintError) {
        res.status(409).json({
            status: 'error',
            message: 'Unique constraint error',
            details: err.errors.map(e => e.message)
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error. Please try again later.',
        });
    }
};

module.exports = errorHandler;
