import Client from "../database";
import { MyProducts } from "./products";

export type MyOrder = {
  id?: number,
  status: string,
  user_id: number,
};

export class MyStoreOrder{
  async MyOrder(): Promise<MyOrder[]> {
        try{
        const MyConnection = await Client.connect();
        const GetOrders = await MyConnection.query("SELECT * FROM orders");
        MyConnection.release();

return GetOrders.rows;

      } catch (err: unknown) {
                throw new Error("Error in the MyOrder"+err as string);
      }
      }

      async GetSpecifcOrder(id:number):Promise<MyOrder>{
        try{
          const MyConnection=await Client.connect();
          const MyRow=await MyConnection.query("SELECT * FROM orders WHERE id = $1;",[id])
          MyConnection.release();

          return MyRow.rows[0];
        }  catch(err){
          throw new Error("Error in get specific Product:"+err+" "+id)
        }
      }

      async CreateNewOrder(NewOrder:MyOrder):Promise<MyOrder>{
        try{
        const MyConnection=await Client.connect();
       
        const CreateOrder=await MyConnection.query("INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *;",
        [NewOrder.status,NewOrder.user_id]);
      MyConnection.release();
          return CreateOrder.rows[0];
         }
    catch(err){
       throw new Error("Error in create Order"+NewOrder.status+" "+err);
    }
    }

    async DeleteOrder(id:number):Promise<MyOrder>{
        try{
        const MyConnection=await Client.connect();
        const DeleteOrder=await MyConnection.query("DELETE from orders WHERE id = ($1) RETURNING *;",[id]);
      MyConnection.release();
      if(DeleteOrder.rowCount!=0||DeleteOrder.rowCount<0)
          return DeleteOrder.rows[0];
          else
          throw new Error();
         }
    catch(err){
       throw new Error("Error in Delete Order"+id+" "+err);
    }
    }







}