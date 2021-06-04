import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User, { UserI } from "../models/Users";
import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
  ForbiddenError,
} from "../utils/error.util";

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
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    //400-Bad request
    return next(new BadRequestError("Enter an email AND password"));
  }

  try {
    const user = await User.findOne({ email: email }).select("email password");

    if (!user) {
      //404-Not found
      return next(new NotFoundError("Invalid credentials"));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      //404-Not found
      return next(new UnauthorizedError("Invalid credentials"));
    }

    //200-ok
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
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

//It is using the method created whithin the user model
//to get a random secret:type node in termonal => require('crypto').randomBytes(35).toString('hex')
const getToken = (user: UserI) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES as string }
  );
};

const sendToken = (user: UserI, statusCode: number, res: Response) => {
  const token = getToken(user);
  res.status(statusCode).json({ success: true, token: token });
};
