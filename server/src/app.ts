import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/auth.routes";
import connectDB from "./config/db.config";

dotenv.config({ path: "./config.env" });

const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", routes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Server error: ${error}`);
  server.close(() => process.exit(1));
});

//50:00
