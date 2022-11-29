import supertest from 'supertest'
import Client from "../database";
import { MyUserStore, MyUser } from "../models/user";
import { MyStoreProducts, MyProducts } from "../models/products";
import app from "../index";
// create a request object


const MyStore = new MyUserStore();
const MyStore1 = new MyStoreProducts();
// create a request object
const request = supertest(app)

 describe("Test Product ", () => {
    describe('Test My Product ', () => {
      const product = {
          name: "MYName",
          price: 200,
        // eslint-disable-next-line prettier/prettier
      } as MyProducts;
  
      beforeAll(async () => {
        const conn = await Client.connect();
        await conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1;")
        conn.release();
        //Test Create Becuse if not returned data other test will be wrong 
        const createProduct = await MyStore1.CreateNewProduct(product);
        product.id = createProduct.id;
      });
  
      afterAll(async () => {
        const conn = await Client.connect();
        const sql = "delete from products;";
        await conn.query(sql);
        conn.release();
      });
  
      it("Test GetSpecifcProduct product", async () => {
        const products = await MyStore1.GetSpecifcProduct(product.id as number);
        expect(products?.name).toBeInstanceOf(String);
        expect(products?.id).toBeInstanceOf(Number);
        expect(products).toBeDefined();
      });
      //I made Test for create above and get data 
      it("Test CreateNewProduct Function Exists", () => {
        expect(MyStore1.CreateNewProduct).toBeDefined();
        expect(product.name).toBeInstanceOf(String);
        expect(product.id).toBeInstanceOf(Number);
      });
      it("Test MyProduct product", async () => {
        const products = await MyStore1.MyProduct();
        expect(products).toBeDefined();
        expect(products.length).toBeGreaterThan(0);
      });
      it("Test get tob three", async () => {
        const products = await MyStore1.TopThreeProduct();
        expect(products.length).toBeLessThanOrEqual(3);
        expect(products.length).toBeGreaterThan(0);
        expect(products).toBeDefined();
      });
  
      it("Test Delete model",async function(){
        const use=await MyStore1.DeleteProduct(product.id as number);
        expect(use?.name).toBeInstanceOf(String);
        expect(use?.price).toBeInstanceOf(Number);
        expect(MyStore.DeleteUser).toBeDefined();
      });
});
});

    describe("Test Api Products", () => {
        const Product = {
          name: "milk",
          price: 50
        // eslint-disable-next-line prettier/prettier
      } as MyProducts;
    
      const User = {
        username: "ali",
        password_digest: "123"
        // eslint-disable-next-line prettier/prettier
      } as MyUser; 
    let  myToken:string;
      beforeAll(async () => {
        const conn = await Client.connect();
        await conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1;")
        conn.release();
        const ProductCreate = await MyStore1.CreateNewProduct(Product);
        const UserCreate = await MyStore.CreateNewUser(User);
        User.id = UserCreate.id; 
        Product.id = ProductCreate.id;
        
      });
    
      afterAll(async () => {
        const conn = await Client.connect();
        await conn.query("delete from products;");
        conn.release();
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

        it("Test Myproduct", async () => {
          const res = await request.get('/products')
            .set("Content-Type", "application/json").
            set("Authorization",`Bearer ${myToken}`)
            
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
        });
        
          it("Test GetSpecificProducts", async() => {
            const res = await request.get('/product?id=1')
            .set("Content-Type", "application/json").
            set("Authorization",`Bearer ${myToken}`)
      
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object); 
           });   
      
           it("Test GetSpecificProducts not work", async() => {
              const res = await request.get('/product?id=100')
              .set("Content-Type", "application/json").
              set("Authorization",`Bearer ${myToken}`)
            expect(res.status).toBe(400);
            expect(res.body).toBeInstanceOf(Object); 
             });   
    
             it("Test productTop", async() => {
                const res = await request.get('/productTop')
                .set("Content-Type", "application/json").
                set("Authorization",`Bearer ${myToken}`)
              expect(res.status).toBe(200);
              expect(res.body).toBeInstanceOf(Array); 
               });
            it("Test addProduct Function",async ()=>{
                const res=await request.post("/product").
                set("Content-Type", "application/json").
                set("Authorization",`Bearer ${myToken}`).
                send({
                    name:"milk",
                    price:50
                            });
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                })


              it("Test Delete Function",async ()=>{
                  const res=await request.delete(`/product?id=${User.id}`).
                  set("Content-Type", "application/json").
                  set("Authorization",`Bearer ${myToken}`);
                  expect(res.status).toBe(200);
                  expect(res.body).toBeNull();
               })
  });

  
      
      
