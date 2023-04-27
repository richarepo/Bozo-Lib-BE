import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const dbConnection = mongoose.createConnection(process.env.DATABASE_URL)
  .on("error", (err) => {
    console.log("Error while connecting to database:", err);
  })
  .once("open", () => {
    console.log("Connected to database:", "JWTNODE");
  });

export default dbConnection;
 