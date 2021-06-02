import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const URI = process.env.MONGO_URI;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

const connectDB = async () => {
  await mongoose.connect(URI as string, options);
  console.log(`MongoDb connected`);
};

export default connectDB;
