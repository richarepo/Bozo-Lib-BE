import axios from "axios";
import { Response } from "express"
import { GOOGLE_SEARCH_URL } from "../constant";
import { AuthenticatedRequest } from "../middleware/authenticate";
import { bookIDSValidation, searchQueryValidation } from "../validation/book"

export const searchBooksByKeyword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const joiResponse = searchQueryValidation({query: req.query.query});
    if (joiResponse.error) {
      return res.status(400).json(joiResponse.error.details[0].message);
    }
    const limit = req.body.limit || 10;
    const url = `${GOOGLE_SEARCH_URL}?q=${req.query.query.toString().replace(/\s{2,}/g, ' ').trim()}&maxResults=${limit}&key=${process.env.GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({error: err.message});
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
      const response = await axios.get(url)
      bookIDs.push(response.data);
    }
    return res.status(200).json(books);
  } catch (err: any) { 
    console.log(err);
    return res.status(500).json({error: err.message});
  }
}