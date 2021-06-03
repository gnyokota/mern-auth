import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

export interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  resetPassWord: string;
  resetPassExpire: Date;
  matchPasswords: (password: string) => Promise<boolean>;
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

export default model<UserI>("User", UserSchema);
