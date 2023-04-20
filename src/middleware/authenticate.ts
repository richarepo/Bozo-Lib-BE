import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userCollection } from "../models/user";
import { User } from "../models/user";

export interface AuthenticatedRequest extends Request {
  user: User;
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, "secret", async (err, decoded: JwtPayload | string) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = await userCollection.findById(decoded.userId);
    next();
  });
};

export default verifyToken;