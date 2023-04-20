import mongoose from "mongoose";

const dbConnection = mongoose.createConnection("mongodb://localhost:27017/JWTNODE")
  .on("error", (err) => {
    console.log("Error while connecting to database:", err);
  })
  .once("open", () => {
    console.log("Connected to database:", "JWTNODE");
  });

export default dbConnection;
 