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
    const joiResponse = searchQueryValidation({ query: req.query.search });
    if (joiResponse.error) {
      return res.status(400).send({error: joiResponse.error.details[0].message});
    }
    const limit = Number(req.body.limit || 10);
    const url = `${GOOGLE_SEARCH_URL}?q=${req.query.search.toString().replace(/\s{2,}/g, ' ').trim()}&maxResults=${limit}&key=${process.env.GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    return res.status(200).send({data: response.data});
  } catch (err: any) {
    console.log(err);
    const errCode = err.response && err.response.status ? err.response.status : 500;
    return res.status(errCode).send({ error: err.message });
  }
}

export const searchBooksByIDs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { bookIDs } = req.body
    const joiResponse = bookIDSValidation(req.body);
    if (joiResponse.error) {
      return res.status(400).send({error: joiResponse.error.details[0].message});
    }
    const books = [];
    for (let id of bookIDs) {
      const url = `${GOOGLE_SEARCH_URL}/${id}?key=${process.env.GOOGLE_API_KEY}`;
      const response = await axios.get(url);
      if (!response.data) return res.status(404).send({ error: "Book Not Found!" });
      books.push(response.data);
    }
    return res.status(200).send({data: books});
  } catch (err: any) {
    console.log(err);
    const errCode = err.response && err.response.status ? err.response.status : 500;
    return res.status(errCode).send({ error: err.message });
  }
}

export const addBookInLibrary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { bookId } = req.params;
    const url = `${GOOGLE_SEARCH_URL}/${bookId}?key=${process.env.GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    if (!response.data) return res.status(404).send({ error: "Book Not Found!" });
    const imageLinks = await new BookImageLink(response.data.volumeInfo.imageLinks).save();
    const book = await new BookVolume({
      title: response.data.volumeInfo.title,  
      bookId: response.data.id,
      description: response.data.volumeInfo.description,
      authors: response.data.volumeInfo.authors,
      publishedDate: new Date(response.data.volumeInfo.publishedDate),
      publisher: response.data.volumeInfo.publisher,
      averageRating: response.data.volumeInfo.averageRating,
      ratingsCount: response.data.volumeInfo.ratingsCount,
      language: response.data.volumeInfo.language,
      imageLinks: imageLinks._id,
    }).save();
    await new BookLibrary({
      userID: req.user._id,
      bookID: book._id
    }).save();
    return res.status(200).send({ message: "Book have been added in the Library" });
  } catch (err) {
    console.log(err);
    const errCode =   err.response && err.response.status ? err.response.status : 500;
    return res.status(errCode).send({ error: err.message });
  }
}

export const getBooksInLibrary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.query.id) {
      const book = await BookLibrary.findById(req.query.id);
      if (!book) return res.send(404).send({ error: "Book Not Found!" });
      return res.status(200).send({data: book});
    } else if (req.query.search) {
      if (req.query.search.toString().length < 3) return res.status(400).send({"error": "Search term should be at least 3 characters."});
      const books = await BookLibrary.find({
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } },
        ],
        userId: req.user.id,
      }).populate('bookID').populate('imageLinks');
      if (books) return res.status(200).send({ "data": books });
      else return res.status(404).send({ error: "Book Not Found!" });
    } else {
      const limit = Number(req.query.limit || 10);
      const books = await BookLibrary.find({}).populate({
        path: 'bookID',
        populate: {
          path: 'imageLinks'
        }
      }).limit(limit);
      return res.status(200).send({books: books});
    }
  } catch (err) {
    const errCode = err.response && err.response.status ? err.response.status : 500;
    return res.status(errCode).send({ error: err.message });
  }
}