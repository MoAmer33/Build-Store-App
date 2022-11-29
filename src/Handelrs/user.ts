import express, { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { MyUser, MyUserStore } from "../models/user";
import dotenv from "dotenv";
import authorization from "../middleware/Authorization";
import { Console } from "console";
dotenv.config();

interface PayLoadJwt{
    id: string,
  }
  const MyUserstore = new MyUserStore();

const MyUserr = async (_req: Request, response: Response) => {
  try {
    const userss= await MyUserstore.MyIndex();
    response.json(userss);
  } catch (err) {
    response.status(400).json(err);
  }

};



const MyData = async (_req: Request, response: Response) => {
    try {
        // eslint-disable-next-line prettier/prettier
    const userr:MyUser = await MyUserstore.GetSpecifcUser(parseInt(_req.query.id as string));
    response.json(userr);
  } catch (error) {
    response.status(400);
    // eslint-disable-next-line prettier/prettier
    response.json(error);
  }
  };

  const CreateUser = async (_req: Request, res: Response) => {
    const User: MyUser = {
      username: _req.body.username,
      password_digest: _req.body.password,
    };
    try {
  
      const NewUser = await MyUserstore.CreateNewUser(User);
      // eslint-disable-next-line prettier/prettier
      const MyToken = jwt.sign({ user: NewUser }, process.env.TOKEN_SECRET as string);
      res.json(MyToken)
    } catch (err: unknown) {
      res.status(400);
      // eslint-disable-next-line prettier/prettier
      res.json(err as string + User);
    }
  };


const DeleteUser = async (_req: Request, res: Response) => {
    try {
    const deleted = await MyUserstore.DeleteUser(_req.body.id);
    res.json(null);
  } catch (error) {
    res.status(401)
    res.json(error)
  
  } 
  
  };

  const Authenticate = async (_req: Request, res: Response) => {
    const user: MyUser = {
      username: _req.body.username,
      password_digest: _req.body.password,
    };
    try {
      const u = await MyUserstore.CipherAuthentication(user.username, user.password_digest);
      const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
      res.json(token)
    } catch (err) {
      res.status(401);
      res.json(err as string + user);
    }
  };

 
 const UserRoutes = (app: express.Application) => {
  app.get("/users",authorization, MyUserr);
  app.get("/user",authorization, MyData);
  app.post("/user", CreateUser)
  app.delete("/user",authorization, DeleteUser);
  app.post("/userAu",Authenticate);
};
  export default UserRoutes;