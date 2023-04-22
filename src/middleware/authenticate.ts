import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userCollection } from "../models/User";
import { User } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user: User;
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, "secret", async (err: any, decoded: JwtPayload | string) => {
    if (err || !decoded || typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = await userCollection.findById(decoded.userId);
    next();
  });
};

export default verifyToken;