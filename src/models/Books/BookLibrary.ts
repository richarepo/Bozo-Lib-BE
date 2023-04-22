import mongoose from 'mongoose';

interface IBookLibrary extends mongoose.Document {
  bookID: IBookLibrary | mongoose.ObjectId;
  userID: mongoose.ObjectId;
}

const bookLibrarySchema = new mongoose.Schema<IBookLibrary>({
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookLibrary',
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
});

const BookLibrary = mongoose.model<IBookLibrary>('BookLibrary', bookLibrarySchema);

export default BookLibrary;
