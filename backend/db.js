import mongoose from "mongoose";
import { config } from "dotenv";
config();

const uri = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

export default connectDb;
