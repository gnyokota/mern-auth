import express from "express";
import { getPrivateData } from "../controllers/protect.controllers";
import protect from "../middlewares/auth.mid";

const protectedRouter = express.Router();

protectedRouter.get("/", protect, getPrivateData);

export default protectedRouter;
