import mongoose from 'mongoose';
import { IVolumeInfo } from './BookVolumeInfo';

export interface IBookItem extends mongoose.Document {
  kind: string;
  id: string;
  VolumeInfo: IVolumeInfo;
}

const bookItemSchema = new mongoose.Schema({
  kind: String,
  id: String,
  VolumeInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookVolumeInfo',
  },
});

export default mongoose.model<IBookItem>('BookItem', bookItemSchema);
