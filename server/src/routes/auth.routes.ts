import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controllers/auth.controllers";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/forgotpass", forgotPassword);
router.put("/resetpass/:resetToken", resetPassword);

export default router;
