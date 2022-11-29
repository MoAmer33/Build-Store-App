import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


// middleware
const verifyAuthToken = (req: Request,res: Response, next: NextFunction): void => {

  try {
    const authorizationHeader = req.headers.authorization; 
    const token = (authorizationHeader as string).split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)

  } catch (error) {
    res.status(401);
  }  
     next();
};

export default verifyAuthToken;
