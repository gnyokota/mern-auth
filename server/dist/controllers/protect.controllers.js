"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateData = void 0;
const getPrivateData = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "You got access to private information",
    });
};
exports.getPrivateData = getPrivateData;
