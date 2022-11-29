import { PoolClient, QueryResult } from "pg";
import Client from "../database";

export type MyProducts = {
  id?: number,
  name: string,
  price: number,
};


export class MyStoreProducts{
    
    async MyProduct(): Promise<MyProducts[]> {
        try{
        const MyConnection = await Client.connect();
        const GetProducts = await MyConnection.query("SELECT * FROM products");
        MyConnection.release();
        return GetProducts.rows;
      } catch (err: unknown) {
                throw new Error("Error in the MyProduct"+err as string);
      }
      }


      async TopThreeProduct(): Promise<{ product_id: number, CountProduct: number }[]> {
        try{
            const MyConnection = await Client.connect();
            const GetTop3Products = await MyConnection.query( "SELECT * FROM products LIMIT 3;");
            MyConnection.release();
            return GetTop3Products.rows;
          } catch (err: unknown) {
                    throw new Error("Error in the MyProductTop3"+err as string);
          }
      }

      async GetSpecifcProduct(id:number):Promise<MyProducts>{
        try{
          const MyConnection=await Client.connect();
          const MyRow=await MyConnection.query("SELECT * FROM products WHERE id = $1;",[id])
          MyConnection.release();
          if(MyRow.rows.length!=0||MyRow.rows.length<0)
          return MyRow.rows[0];
          else
          throw new Error();
        }  catch(err){
          throw new Error("Error in get specific Product:"+err+" "+id)
        }
      }

      async CreateNewProduct(NewProduct:MyProducts):Promise<MyProducts>{
        try{
        const MyConnection=await Client.connect();
       
        const CreateProduct=await MyConnection.query("INSERT INTO products (name,price) VALUES($1,$2) RETURNING *;",
        [NewProduct.name,NewProduct.price]);
      MyConnection.release();
    return CreateProduct.rows[0];
         }
    catch(err){
       throw new Error("Error in create Product"+NewProduct.name+" "+err);
    }
    }

    async DeleteProduct(id:number):Promise<MyProducts>{
        try{
        const MyConnection=await Client.connect();
        const DeleteProduct=await MyConnection.query("DELETE from products WHERE id = ($1) RETURNING *",[id]);
      MyConnection.release();
    return DeleteProduct.rows[0];
         }
    catch(err){
       throw new Error("Error in Delete Product"+id+" "+err);
    }
    }

}