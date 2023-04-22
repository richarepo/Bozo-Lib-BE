import mongoose from "mongoose";
import dbConnection from '../db/connection'

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, { timestamps: true });

export const userCollection = dbConnection.model<User>('user', userSchema, 'user');
