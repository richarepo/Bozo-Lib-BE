import mongoose from 'mongoose';
import { IBookImageLinks } from './BookImageLink';

export interface IVolumeInfo extends mongoose.Document {
  title: string;
  description: string;
  authors: string[];
  publishedDate: string;
  publisher: string;
  averageRating: number;
  ratingsCount: number;
  imageLinks: IBookImageLinks;
  language: string;
}

const volumeInfoSchema = new mongoose.Schema({
  title: String,
  description: String,
  authors: [String],
  publishedDate: String,
  publisher: String,
  averageRating: Number,
  ratingsCount: Number,
  imageLinks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookImageLinks',
  },
  language: String,
});

export default mongoose.model<IVolumeInfo>('VolumeInfo', volumeInfoSchema);
