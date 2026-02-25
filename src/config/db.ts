
import mongoose  from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const mongoUrl = process.env.MONGO_URI as string

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connect(mongoUrl);
    console.log('MongoDB Connected...');
  } catch (err) {
    if(err instanceof Error) {
        console.error(err.message);
    } else {
        console.error("An unexpected error occurred:", err);
    }
    process.exit(1);
  }
};

export default connectDB;
