import { Router } from "express";
import { searchBooksByKeyword, searchBooksByIDs } from "../api/books";

const route = Router();

route.get("/search", searchBooksByKeyword);
route.get("/bookids", searchBooksByIDs)

export default route;