import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { InternalServerError } from "./error.util";

dotenv.config({ path: "./config.env" });

type Options = {
  to: string;
  subject: string;
  text: string;
};

const sendEmail = (options: Options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return new InternalServerError(
        "There was an error to send the email",
        error
      );
    } else {
      return info;
    }
  });
};

export default sendEmail;
