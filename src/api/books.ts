import axios from "axios";
import { Response } from "express"
import { GOOGLE_SEARCH_URL } from "../constant";
import { AuthenticatedRequest } from "../middleware/authenticate";
import { bookIDSValidation, searchQueryValidation } from "../validation/book"
import BookLibrary from "../models/Books/BookLibrary";
import BookVolume from "../models/Books/BookVolumeInfo";
import BookImageLink from "../models/Books/BookImageLink";

export const searchBooksByKeyword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const joiResponse = searchQueryValidation({ query: req.query.query });
    if (joiResponse.error) {
      return res.status(400).json(joiResponse.error.details[0].message);
    }
    const limit = Number(req.body.limit || 10);
    const url = `${GOOGLE_SEARCH_URL}?q=${req.query.query.toString().replace(/\s{2,}/g, ' ').trim()}&maxResults=${limit}&key=${process.env.GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (err: any) {
    console.log(err);
    const errCode = err.response && err.response.status ? err.response.status : 500;
    return res.status(errCode).json({ error: err.message });
  }
}

export const searchBooksByIDs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { bookIDs } = req.body
    const joiResponse = bookIDSValidation(req.body);
    if (joiResponse.error) {
      return res.status(400).json(joiResponse.error.details[0].message);
    }
    const books = [];
    for (let id of bookIDs) {
      const url = `${GOOGLE_SEARCH_URL}/${id}&key=${process.env.GOOGLE_API_KEY}`;
      const response = await axios.get(url);
      if (!response.data) return res.status(404).json({ error: "Book Not Found!" });
      bookIDs.push(response.data);
    }
    return res.status(200).json(books);
  } catch (err: any) {
    console.log(err);
    const errCode = err.response && err.response.status ? err.response.status : 500;
    return res.status(errCode).json({ error: err.message });
  }
}

export const addBookInLibrary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { bookId } = req.params;
    const url = `${GOOGLE_SEARCH_URL}/${bookId}&key=${process.env.GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    if (!response.data) return res.status(404).json({ error: "Book Not Found!" });
    const imageLinks = await new BookImageLink(response.data.imageLinks).save();
    const book = await new BookVolume({
      title: response.data.volumeInfo.title,
      bookId: response.data.id,
      description: response.data.volumeInfo.description,
      authors: response.data.volumeInfo.authors,
      publishedDate: new Date(response.data.volumeInfo.published),
      publisher: response.data.volumeInfo.publisher,
      averageRating: response.data.volumeInfo,
      ratingsCount: response.data.ratingsCount,
      language: response.data.language,
      imageLinks: imageLinks._id,
    }).save();
    await new BookLibrary({
      userID: req.user._id,
      bookID: book._id
    }).save();
    return res.status(200).json({ message: "Book have been added in the Library" });
  } catch (err) {
    const errCode = err.response && err.response.status ? err.response.status : 500;
    return res.status(errCode).json({ error: err.message });
  }
}

export const getBookInLibrary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.query.id) {
      const book = await BookLibrary.findById(req.query.id);
      if (!book) return res.status(404).json({ error: "Book Not Found!" });
      return res.status(200).json(book);
    } else if (req.query.query) {
      const books = await BookLibrary.find({
        $or: [
          { title: req.query.query },
          { description: req.query.query },
        ],
        userId: req.user.id,
      }).populate('BookId').populate('imageLinks');
      if (books) return res.status(200).json({ "data": books });
      else return res.status(404).json({ error: "Book Not Found!" });
    } else {
      const limit = Number(req.query.limit || 10);
      const books = await BookLibrary.find({}).populate('BookId').limit(limit);
      return books;
    }
  } catch (err) {
    const errCode = err.response && err.response.status ? err.response.status : 500;
    return res.status(errCode).json({ error: err.message });
  }
}