import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config({ path: "./config.env" });

export interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  resetPassWord: string;
  resetPassToken?: string;
  resetPassExpire?: number;
  matchPasswords: (password: string) => Promise<boolean>;
  getResetToken: () => string;
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

UserSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPassToken = crypto
    .createHash("Sha256")
    .update(resetToken)
    .digest("hex");

  //6000ms = 10 min
  this.resetPassExpire = Date.now() + 600 * 1000;

  return resetToken;
};

export default model<UserI>("User", UserSchema);
