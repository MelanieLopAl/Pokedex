import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

const connectToDatabase = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("Connected to database:", db.connection.name);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected to the database");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose is disconnected from the database");
  });
};

export default connectToDatabase;
