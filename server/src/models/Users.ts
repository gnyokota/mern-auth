import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

export interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  resetPassWord: string;
  resetPassExpire: Date;
  matchPasswords: (password: string) => Promise<boolean>;
  getToken: () => string;
}

const UserSchema = new Schema<UserI>({
  username: {
    type: String,
    required: [true, "Please provide an username!"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email!"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password!"],
    minlength: 6,
    select: false,
  },
  resetPassToken: String,
  resetPassExpire: Date,
});

UserSchema.pre<UserI>("save", async function (this, next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

//to get a random secret:type node in termonal => require('crypto').randomBytes(35).toString('hex')
UserSchema.methods.getToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES as string }
  );
};

export default model<UserI>("User", UserSchema);
