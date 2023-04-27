import { Router, Request, Response } from "express";
import { signup, signin } from "../api/auth";
import bookRoute from "../routes/book";

const route = Router();

route.post("/signup", signup);
route.post("/signin", signin);

route.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

route.use("/book", bookRoute);

export default route;