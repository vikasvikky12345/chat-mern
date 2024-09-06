import mongoose from "mongoose";

export const connectToMongodb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    return conn;
  } catch (error) {
    console.log(`error while connecting to mongodb ${error.message}`);
  }
};
