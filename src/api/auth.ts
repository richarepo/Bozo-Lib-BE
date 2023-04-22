import { Request, Response } from "express";
import { signinValidation, signupValidation } from "../validation/auth";
import jwt from "jsonwebtoken";
import { userCollection } from "../models/User";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  try {
    const joiResponse = signupValidation(req.body);
    if (joiResponse.error) {
      return res.status(400).send(joiResponse.error);
    }
    const isUserPresent = await userCollection.findOne({email: req.body.email});
    if (isUserPresent) {
      return res.status(400).send('User already exists');
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    await new userCollection({email: req.body.email, password: hashedPassword}).save();
    return res.status(201).send("User has been successfully created.");
  } catch (err: any) {
    return res.status(500).send({"error": err});
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const joiResponse = signinValidation(req.body);
    if (joiResponse.error) {
      return res.status(400).send(joiResponse.error);
    }
    const user = await userCollection.findOne({email: req.body.email,});
    if (!user) {
      return res.status(400).send('User does not exist');
    }
    const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordMatch) return res.status(400).send({"error": "Email/Password does not match"});
    const token = jwt.sign({ userId: user._id }, "secret", {expiresIn: "1h"})
    res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 }); 
    return res.status(200).send({token});
  } catch (err: any) {
    return res.status(500).send({"error": err});
  }
}