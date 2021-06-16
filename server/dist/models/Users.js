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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config({ path: "./config.env" });
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Please provide an username!"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email!"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password!"],
        minlength: 6,
        select: false,
    },
    resetPassToken: String,
    resetPassExpire: Date,
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        next();
    });
});
UserSchema.methods.matchPasswords = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
UserSchema.methods.getResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(20).toString("hex");
    this.resetPassToken = crypto_1.default
        .createHash("Sha256")
        .update(resetToken)
        .digest("hex");
    //6000ms = 10 min
    this.resetPassExpire = Date.now() + 600 * 1000;
    return resetToken;
};
exports.default = mongoose_1.model("User", UserSchema);
