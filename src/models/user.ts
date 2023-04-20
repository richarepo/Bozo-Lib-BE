import mongoose from "mongoose";
import dbConnection from '../db/connection'

export interface User extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String
    }
  }, { timestamps: true });

export const userCollection = dbConnection.model<User>('user', userSchema, 'user');
