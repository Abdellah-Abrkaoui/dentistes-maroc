import mongoose from "mongoose";
import "dotenv/config";
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    process.exit(1);
  }
};
export default connectToDB;
