import mongoose from 'mongoose';

export interface IBookInfoSearchResponse extends mongoose.Document {
  kind: string;
  totalItems: number;
}

const bookInfoSearchResponseSchema = new mongoose.Schema({
  kind: String,
  totalItems: Number,
});

export default mongoose.model<IBookInfoSearchResponse>('BookInfoSearchResponse', bookInfoSearchResponseSchema);
