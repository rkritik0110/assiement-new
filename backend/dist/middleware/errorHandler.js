"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorTypes_1 = require("../utils/errorTypes");
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    // Handle ZodError (validation errors)
    if (error instanceof zod_1.ZodError) {
        const validationErrors = error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
        }));
        res.status(400).json({
            status: 'error',
            message: 'Validation error',
            errors: validationErrors,
        });
        return;
    }
    // Handle custom errors
    if (error instanceof errorTypes_1.BaseError) {
        res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
        return;
    }
    // Handle other errors
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
};
exports.errorHandler = errorHandler;
