import mongoose from "mongoose";

export const connectToMongodb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://rebbavikas2000:vikas@cluster0.lhyi6.mongodb.net/mern-chat?retryWrites=true&w=majority&appName=Cluster0"
    );
    return conn;
  } catch (error) {
    console.log(`error while connecting to mongodb ${error.message}`);
  }
};
