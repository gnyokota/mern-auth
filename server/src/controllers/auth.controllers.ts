import { Request, Response, NextFunction } from "express";
import User, { UserI } from "../models/Users";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    //201-created
    res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    //500 - internal server error
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    //400-bad request
    res.status(400).json({
      success: false,
      error: "Please provide the email and password",
    });
  }

  try {
    const user = await User.findOne({ email: email }).select("password");

    if (!user) {
      //404-Not found
      res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await (user as UserI).matchPasswords(password);

    if (!isMatch) {
      res.status(404).json({ success: false, error: "Invalid credentials" });
    }

    //200 -ok
    res.status(200).json({
      success: true,
      token: "fake token for now",
    });
  } catch (error) {
    //500- Internal server error
    res.status(500).json({ success: false, error: error.message });
  }
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
