import mongoose from 'mongoose';
import dbConnection from '../../db/connection';
import { IBookImageLinks } from './BookImageLink';

export interface IVolumeInfo extends mongoose.Document {
  title: string;
  description: string;
  authors: string[];
  publishedDate: string;
  publisher: string;
  averageRating: number;
  ratingsCount: number;
  imageLinks: IBookImageLinks | mongoose.ObjectId;
  language: string;
}

const volumeInfoSchema = new mongoose.Schema({
  title: String,
  bookId: {
    type: String,
    required: true,
  },
  description: String,
  authors: [String],
  publishedDate: Date,
  publisher: String,
  averageRating: Number,
  ratingsCount: Number,
  imageLinks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookImageLinks',
  },
  language: String,
});

export default dbConnection.model<IVolumeInfo>('BookVolumeInfo', volumeInfoSchema);
