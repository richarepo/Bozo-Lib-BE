import { Router } from "express";
import { signup, signin } from "../api/auth";
import verifyToken from "../middleware/authenticate";
import bookRoute from "../routes/book";

const route = Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.use("/book", verifyToken, bookRoute)

export default route;