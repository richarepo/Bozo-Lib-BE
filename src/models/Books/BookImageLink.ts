import mongoose from 'mongoose';
import dbConnection from '../../db/connection';

export interface IBookImageLinks extends mongoose.Document {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

const bookImageLinksSchema = new mongoose.Schema({
  smallThumbnail: {
    type: String
  },
  thumbnail: {
    type: String
  },
  small: {
    type: String
  },
  medium: {
    type: String
  },
  large: {
    type: String
  },
  extraLarge: {
    type: String
  },
});

export default dbConnection.model<IBookImageLinks>('BookImageLinks', bookImageLinksSchema);
