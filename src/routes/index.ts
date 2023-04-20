import { Router, Request, Response } from "express";
import { signup, signin } from "../api/auth";
import verifyToken, { AuthenticatedRequest } from "../middleware/authenticate";

const route = Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.get("/nothing", verifyToken, (req: AuthenticatedRequest, res: Response) => { return res.status(200).send({user: req.user});});

export default route;