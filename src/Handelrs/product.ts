import { MyProducts, MyStoreProducts } from "../models/products";
import authorization from "../middleware/Authorization";
import express, { Request, Response } from "express";

const Products_Store = new MyStoreProducts();

const MyOrder = async (_req: Request, response: Response) => {
  try {
    const Product = await Products_Store.MyProduct();
    response.json(Product);
  } catch (error) {
    response.status(400).send(`error throughout in products ${error}`);
  }
};


const GetProduct = async (_req: Request, response: Response) => {
    try {
      const MyOrder = await  Products_Store.TopThreeProduct();
      response.json(MyOrder);
    } catch (error) {
      response.status(400).send(`error throughout products ${error}`);
    }
  };



  const MyData = async (_req: Request, res: Response) => {
    try {
      // eslint-disable-next-line prettier/prettier
      const MyProduct = await Products_Store.GetSpecifcProduct(parseInt(_req.query.id as string));
      res.json(MyProduct);
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  };


  const CreateProduct = async (_req: Request, response: Response) => {
    try {
      const MyProduct: MyProducts = {
        name: _req.body.name,
        price: _req.body.price,
      };

      const NewProduct = await Products_Store.CreateNewProduct(MyProduct);
      response.json(NewProduct);
    } catch (err) {
      response.status(400);
      response.json(err);
    }
  };


  const Delete = async (_req: Request, response: Response) => {
    try{
    const Deleted = await Products_Store.DeleteProduct(_req.body.id);
    response.json(null);
    }catch(err){
      response.status(400).json(err);
    }
  };
  
  const Products_Routes = (app: express.Application) => {
    app.get("/products",authorization, MyOrder);
    app.get("/productTop",authorization, GetProduct);
    app.get("/product", authorization, MyData);
    app.post("/product",authorization, CreateProduct);
    app.delete("/product",authorization, Delete);
  };
  
  export default Products_Routes;

