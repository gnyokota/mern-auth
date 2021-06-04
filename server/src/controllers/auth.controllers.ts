import { Request, Response, NextFunction } from "express";
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
    const user = await User.findOne({ email: email }).select("password");

    if (!user) {
      //404-Not found
      return next(new NotFoundError("Invalid credentials"));
    }

    const isMatch = await (user as UserI).matchPasswords(password);

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
const sendToken = (user: UserI, statusCode: number, res: Response) => {
  const token = user.getToken();
  res.status(statusCode).json({ success: true, token: token });
};
