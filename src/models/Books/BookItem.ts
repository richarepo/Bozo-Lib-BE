import mongoose from 'mongoose';
import dbConnection from '../../db/connection';
import { IVolumeInfo } from './BookVolumeInfo';

export interface IBookItem extends mongoose.Document {
  kind: string;
  id: string;
  BookVolumeInfo: IVolumeInfo;
}

const bookItemSchema = new mongoose.Schema({
  kind: String,
  id: String,
  BookVolumeInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookVolumeInfo',
  },
});

export default dbConnection.model<IBookItem>('BookItem', bookItemSchema);
