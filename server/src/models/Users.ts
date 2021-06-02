import { Schema, Document, model } from "mongoose";

interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  resetPassWord: string;
  resetPassExpire: Date;
}

const UserSchema = new Schema({
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

export default model<UserI>("User", UserSchema);
