import { Router } from "express";
import { searchBooksByKeyword, searchBooksByIDs, getBooksInLibrary, addBookInLibrary } from "../api/books";

const route = Router();

route.get("/search", searchBooksByKeyword);
route.get("/bookids", searchBooksByIDs)

route.get("/library", getBooksInLibrary);
route.post("/library:bookId", addBookInLibrary);

export default route;