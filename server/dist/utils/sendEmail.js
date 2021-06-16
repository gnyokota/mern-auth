"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_util_1 = require("./error.util");
dotenv_1.default.config({ path: "./config.env" });
const sendEmail = (options) => {
    const transporter = nodemailer_1.default.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return new error_util_1.InternalServerError("There was an error to send the email", error);
        }
        else {
            return info;
        }
    });
};
exports.default = sendEmail;
