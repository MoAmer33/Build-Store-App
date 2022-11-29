import { MyOrder, MyStoreOrder} from "./../models/order";
import express, { Request, Response } from "express";
import authorization from "../middleware/Authorization";
import dotenv from "dotenv";
dotenv.config();
const MyOrderStore = new MyStoreOrder();





  const MyData = async (_req: Request, response: Response) => {
    if (_req.query.id==null) {
            response.status(400).send(`Error in Id Order`);
    } else
    { 
        try {
        const MyOrder = await MyOrderStore.GetSpecifcOrder(parseInt(_req.query.id as string));
        response.json(MyOrder);
      } catch (err) {
        response.status(400).send(`${err} Error`);
      }
    }
  };




  
const CreateOrder = async (_req: Request, response: Response) => {
        const my_order: MyOrder = { 
          status: _req.body.status,
          user_id: _req.body.user_id,
        };  
        try {
        console.log(my_order.status,my_order.user_id)
        const new_Order= await MyOrderStore.CreateNewOrder(my_order);
        response.json(new_Order);
      } catch (err) {
        response.status(400);
        response.json(err);
      } 
    
  };



  const DeleteOrder = async (_req: Request, response: Response) => {
    if (_req.body.id==null) {
       response.status(400).json({ message: "Error when send id" });
    } 
    else {
        try {
        const Deleted = await MyOrderStore.DeleteOrder(_req.body.id);
    response.json(null);
      } catch (error) {
        response.status(400);
        response.json(error);
      }
     
    }
  };




//get order_product
const GetProductOrder = async (_req: Request, response: Response) => {
    try {
      const order = await MyOrderStore.MyOrder();
      response.json(order);
    } catch (error) {
      response.status(400).send(`error throughout orders ${error}`);
    }
  };
  
  const OrderRoutes = (app: express.Application) => {
    app.get("/order",authorization, MyData);
    app.post("/order",authorization, CreateOrder);
    app.delete("/order",authorization, DeleteOrder);
    app.get("/orders",authorization, GetProductOrder);

  };
  
  export default OrderRoutes;