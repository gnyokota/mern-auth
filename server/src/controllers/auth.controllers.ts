import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config({ path: "./config.env" });

import User, { UserI } from "../models/Users";
import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
} from "../utils/error.util";
import sendEmail from "../utils/sendEmail";

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

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new NotFoundError("User not found!"));
    }

    const resetToken = user.getResetToken();
    await user.save();

    const urlEnv = process.env.RESET_URL as string;

    const resetUrl = `${urlEnv}/${resetToken}`;

    const messageHtml = `<h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset requested",
        text: messageHtml,
      });

      res.status(200).json({ success: true, data: "email sent" });
    } catch (error) {
      user.resetPassToken = undefined;
      user.resetPassExpire = undefined;

      await user.save();
      return next(new InternalServerError("Email could not be sent"));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPassToken: resetToken,
      resetPassExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new BadRequestError("Invalid reset token"));
    }

    user.password = req.body.password;
    user.resetPassToken = undefined;
    user.resetPassExpire = undefined;

    await user.save();

    res
      .status(201)
      .json({ success: true, data: "Password was successfully reset" });
  } catch (error) {
    next(error);
  }
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
