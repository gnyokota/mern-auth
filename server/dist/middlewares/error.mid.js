"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_util_1 = require("../utils/error.util");
const errorHandler = (error, req, res, next) => {
    let customError = Object.assign({}, error);
    customError.message = error.message;
    if (error.statusCode === 11000) {
        const message = "Duplicated field value enter";
        //400-Bad Request
        customError = new error_util_1.BadRequestError(message);
    }
    res.status(customError.statusCode || 500).json({
        success: false,
        error: customError.message || "Internal Server Error",
    });
};
exports.default = errorHandler;
