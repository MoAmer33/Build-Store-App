import supertest from 'supertest'
import Client from "../database";
import { MyStoreOrder, MyOrder } from "../models/order";
import { MyUserStore, MyUser } from "../models/user";

import app from "../index";

// create a request object

const request = supertest(app)
const MyStore_user = new MyUserStore();

const MyStore_order = new MyStoreOrder();


//Test Order
describe("Test My Orders ", () => {
    describe('Test order model', () => {
      const User = {
          username: "ali",
          password_digest: "123"
          // eslint-disable-next-line prettier/prettier
        } as MyUser;  
        
        const Order = {
          status: 'completed',
          user_id: 1,
        // eslint-disable-next-line prettier/prettier
      } as MyOrder;

      beforeAll(async () => {
        const conn = await Client.connect();
        await conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1;");
        await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
        conn.release();
        const UserCreate = await MyStore_user.CreateNewUser(User);
        const OrderCreate = await MyStore_order.CreateNewOrder(Order);
        Order.id = OrderCreate.id;
        User.id = UserCreate.id;
      });
  
      afterAll(async () => {
        const MyConnection = await Client.connect();
        await MyConnection.query("delete from orders");
        await MyConnection.query("delete from users;");
        MyConnection.release();
      });
  
      it("Test Get Specific ", async () => {
        const orders = await MyStore_order.GetSpecifcOrder(Order.id as number);
        expect(orders?.status).toBe("completed");
        expect(orders).toBeDefined();
        expect(String(orders?.user_id)).toBe("1");
      });
     
  
      it("Test MyOrder Function Exists", async () => {
        const orders = await MyStore_order.MyOrder();
        expect(orders.length).toBeGreaterThan(0);
        expect(String(orders)).toBeDefined();
      });  
     it("Test CreateNewOrder Function Exists", () => {
        expect(MyStore_order.CreateNewOrder).toBeDefined();
        expect(Order.id).toBeInstanceOf(Number);
        expect(Order.user_id).toBeInstanceOf(Number);
      });
      
      it("Test Delete Function Exists", async () => {
        const orders = await MyStore_order.DeleteOrder(Order.id as number);
        expect(orders.id).toBeInstanceOf(Number);
        expect(orders.user_id).toBeInstanceOf(String);
        expect(String(orders)).toBeDefined();
      }); 
    });
  });
  
   describe("Test Order Api", () => {
    const User = {
      username: "ali",
      password_digest: "123"
      // eslint-disable-next-line prettier/prettier
    } as MyUser;  
    
    const Order = {
      status: 'completed',
      user_id: 1,
    // eslint-disable-next-line prettier/prettier
  } as MyOrder;
  let myToken: string;
  
      beforeAll(async () => {
        const conn = await Client.connect();
        await conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1;");
        await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
        conn.release();
        const createUser = await MyStore_user.CreateNewUser(User);
        const createOrder = await MyStore_order.CreateNewOrder(Order);
        Order.id = createOrder.id;
        User.id = createUser.id;
      });
  
      afterAll(async () => {
        const MyConnection = await Client.connect();
        await MyConnection.query("delete from orders");
        await MyConnection.query("delete from users;");
        MyConnection.release();
      });


      it("Take Token ", async () => {
        const res = await request.post("/userAu")
          .set("Content-Type", "application/json")
          .send({
            username: User.username,
            password: User.password_digest
          });
        myToken = res.body;
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(String);
      });
    it("Test Myorder Work", async () => {
      const res = await request.get('/orders')
        .set("Content-Type", "application/json")
        .set('Authorization', `Bearer ${myToken}`);
  
        
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
    
  
       it("Test GetSpecific not work", async() => {
          const res = await request.get('/order?id=100')
          .set("Content-Type", "application/json")
                  expect(res.status).toBe(401);

         });   

         it("Test Create order", async() => {
          const res = await request.post('/order')
          .set("Content-Type", "application/json").
          set("Authorization",`Bearer ${myToken}`).send
          ({
            status:"active",
            user_id:User.id

          });
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object); 
         }); 

         it("Test Getspecific", async() => {
          const res = await request.get(`/order?id=${Order.id}`)
          .set("Content-Type", "application/json")
          .set('Authorization', `Bearer ${myToken}`);
    
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object); 
         });   
     it("Test Delete Function",async()=>{
        const res=await request.delete("/order").
        set("Content-Type", "application/json").
        set("Authorization",`Bearer ${myToken}`).send
        ({
        id:Order.id
        });
        expect(res.status).toBe(200);
        expect(res.body).toBeNull();
      })     
  })