import mongoose from 'mongoose';
import dbConnection from '../../db/connection';interface IBookLibrary extends mongoose.Document {
  bookID: IBookLibrary | mongoose.ObjectId;
  userID: mongoose.ObjectId;
}

const bookLibrarySchema = new mongoose.Schema<IBookLibrary>({
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookVolumeInfo',
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
});

const BookLibrary = dbConnection.model<IBookLibrary>('BookLibrary', bookLibrarySchema);

export default BookLibrary;
