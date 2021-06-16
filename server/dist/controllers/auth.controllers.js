"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config({ path: "./config.env" });
const Users_1 = __importDefault(require("../models/Users"));
const error_util_1 = require("../utils/error.util");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield Users_1.default.create({
            username,
            email,
            password,
        });
        //201-created
        sendToken(user, 201, res);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        //400-Bad request
        return next(new error_util_1.BadRequestError("Enter an email AND password"));
    }
    try {
        const user = yield Users_1.default.findOne({ email: email }).select("email password");
        if (!user) {
            //404-Not found
            return next(new error_util_1.NotFoundError("Invalid credentials"));
        }
        const isMatch = yield user.matchPasswords(password);
        if (!isMatch) {
            //404-Not found
            return next(new error_util_1.UnauthorizedError("Invalid credentials"));
        }
        //200-ok
        sendToken(user, 200, res);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield Users_1.default.findOne({ email: email });
        if (!user) {
            return next(new error_util_1.NotFoundError("User not found!"));
        }
        const resetToken = user.getResetToken();
        yield user.save();
        const urlEnv = process.env.RESET_URL;
        const resetUrl = `${urlEnv}/${resetToken}`;
        const messageHtml = `<h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;
        try {
            yield sendEmail_1.default({
                to: user.email,
                subject: "Password reset requested",
                text: messageHtml,
            });
            res.status(200).json({ success: true, data: "email sent" });
        }
        catch (error) {
            user.resetPassToken = undefined;
            user.resetPassExpire = undefined;
            yield user.save();
            return next(new error_util_1.InternalServerError("Email could not be sent"));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resetToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
    try {
        const user = yield Users_1.default.findOne({
            resetPassToken: resetToken,
            resetPassExpire: { $gt: Date.now() },
        });
        if (!user) {
            return next(new error_util_1.BadRequestError("Invalid reset token"));
        }
        user.password = req.body.password;
        user.resetPassToken = undefined;
        user.resetPassExpire = undefined;
        yield user.save();
        res
            .status(201)
            .json({ success: true, data: "Password was successfully reset" });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
//It is using the method created whithin the user model
//to get a random secret:type node in termonal => require('crypto').randomBytes(35).toString('hex')
const getToken = (user) => {
    return jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
};
const sendToken = (user, statusCode, res) => {
    const token = getToken(user);
    res.status(statusCode).json({ success: true, token: token });
};
