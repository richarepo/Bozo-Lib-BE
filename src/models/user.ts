import mongoose from "mongoose";
import dbConnection from '../db/connection'


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String
    }
  }, { timestamps: true });

export const userCollection = dbConnection.model('user', userSchema, 'user');
