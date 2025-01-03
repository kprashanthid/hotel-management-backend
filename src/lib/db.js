import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://admin:Prashanth2001@hotel-management-projec.89gxc.mongodb.net/hotel-db?retryWrites=true&w=majority&appName=hotel-management-project";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  }
};
