import mongoose from 'mongoose';

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

export default mongoose.model<IBookImageLinks>('BookImageLinks', bookImageLinksSchema);
