"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const db_config_1 = __importDefault(require("./config/db.config"));
const error_mid_1 = __importDefault(require("./middlewares/error.mid"));
const protect_routes_1 = __importDefault(require("./routes/protect.routes"));
dotenv_1.default.config({ path: "./config.env" });
const app = express_1.default();
db_config_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/protected", protect_routes_1.default);
//Error handler should be the last middleware
app.use(error_mid_1.default);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
process.on("unhandledRejection", (error, promise) => {
    console.log(`Server error: ${error}`);
    server.close(() => process.exit(1));
});
//1:55:31
