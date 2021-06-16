"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protect_controllers_1 = require("../controllers/protect.controllers");
const auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
const protectedRouter = express_1.default.Router();
protectedRouter.get("/", auth_mid_1.default, protect_controllers_1.getPrivateData);
exports.default = protectedRouter;
