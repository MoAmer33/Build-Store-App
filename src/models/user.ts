import { PoolClient, QueryResult } from "pg";
import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { type } from "os";
import { Console } from "console";

dotenv.config();




const cipher_password=process.env.BCRYPT_PASSWORD;

const RoundOfSalt=process.env.SALT_ROUNDS;


export type MyUser ={
    id?:number,
    username:string,
    password_digest:string,
};
export class MyUserStore {
async MyIndex():Promise <MyUser[]>{
  try {
    const MyConnection = await Client.connect();
    const result= await MyConnection.query("SELECT * FROM users");
    MyConnection.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Couldn't get users, ${err}`);
  }
}
async GetSpecifcUser(id:number):Promise<MyUser>{
  try{
    const MyConnection:PoolClient=await Client.connect();
    const MyRow=await MyConnection.query("SELECT * FROM users WHERE id=($1)",[id])
    MyConnection.release();
    return MyRow.rows[0];
  }  catch(err){
    throw new Error("Error in get specific user:"+err+" "+id)
  }
}

async CreateNewUser(NewUser:MyUser):Promise<MyUser>{
    try{
      
    const MyConnection=await Client.connect();
     const CipherPassword=bcrypt.hashSync(NewUser.password_digest+cipher_password,
        parseInt(RoundOfSalt as unknown as string));

    const CreateUser=await MyConnection.query("INSERT INTO users (username, password_digest) VALUES($1,$2) RETURNING *",
    [NewUser.username,CipherPassword]);
  MyConnection.release();
return CreateUser.rows[0];
     }
catch(err){
   throw new Error("Error in create user"+NewUser.username+" "+err);
}
}


async DeleteUser(id:number):Promise<MyUser>{
    try{
    const MyConnection=await Client.connect();
    const DeleteUser=await MyConnection.query("DELETE FROM users WHERE id=($1) RETURNING *",[id]);
  MyConnection.release();
return DeleteUser.rows[0];
     }
catch(err){
   throw new Error("Error in Delete user"+id+" "+err);
}
}

async CipherAuthentication(UserName:string,Password:string):Promise<MyUser | null>{
    try
    {
        const MyConnection=await Client.connect();
        const GetUser=await MyConnection.query("SELECT id,username,password_digest FROM users WHERE username=($1)",[UserName]);
    if(GetUser.rows.length!=0)
    {
        const User=GetUser.rows[0];
        if(bcrypt.compareSync(Password+cipher_password,User.password_digest)){
         return User;
        }
    }
    return null;
    }
    catch (error: unknown) {
        throw new Error("Error in the Authuntication"+ error as string);
    }
    
 }

}  