import jwt from "jsonwebtoken";
import User, { UserI } from "../models/Users";
import { Request, Response, NextFunction } from "express";
import { NotFoundError, UnauthorizedError } from "../utils/error.util";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

type Decode = {
  _id: string;
};

type UserReq = Request & {
  user: UserI;
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(
        new UnauthorizedError("You are not authorized to access this route")
      );
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err, user) => {
        if (err) {
          next(new UnauthorizedError("Invalid token", err));
        }

        return user;
      }
    );

    const user = await User.findById((decode as unknown as Decode)._id);

    if (!user) {
      next(new NotFoundError("User with this id not found!"));
    }

    (req as UserReq).user = user as UserI;

    next();
  } catch (error) {
    next(new UnauthorizedError("You are not authorized to access this route"));
  }
};

export default protect;
