import mongoose from 'mongoose';
import dbConnection from '../../db/connection';

export interface IBookInfoSearchResponse extends mongoose.Document {
  kind: string;
  totalItems: number;
}

const bookInfoSearchResponseSchema = new mongoose.Schema({
  kind: String,
  totalItems: Number,
});

export default dbConnection.model<IBookInfoSearchResponse>('BookInfoSearchResponse', bookInfoSearchResponseSchema);
