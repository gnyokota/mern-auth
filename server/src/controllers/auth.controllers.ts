import { Request, Response, NextFunction } from "express";
import User from "../models/Users";
import bcrypt from "bcrypt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  res.send("login route");
};

export const forgotPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Forgot password route");
};

export const resetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Reset password route");
};
