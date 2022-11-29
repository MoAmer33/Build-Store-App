import supertest from 'supertest'
import Client from "../database";
import { MyUserStore, MyUser } from "../models/user";
import app from "../index";
// create a request object


const MyStore = new MyUserStore();

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  describe('Test My Model ', () => {
    const user = {
      username: "ali",
      password_digest: "123"
      // eslint-disable-next-line prettier/prettier
    } as MyUser;

    beforeAll(async () => {
      const conn = await Client.connect();
      await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
      conn.release();
  //Test Create Becuse if not returned data other test will be wrong 
      const createUser = await MyStore.CreateNewUser(user);
      user.id= createUser.id;
    });

    afterAll(async () => {
      const MyConnection = await Client.connect();
      await MyConnection.query("delete from users;");
      MyConnection.release();
    }); 
    it("Test CreateNewUser Function Exists", () => {
      expect(MyStore.CreateNewUser).toBeDefined();
      expect(user.id).toBeInstanceOf(Number);
      expect(user.username).toBeInstanceOf(String);
      expect(user.password_digest).toBeInstanceOf(String);
    });
    it("Test CipherAuthentication model", async function() {
      const users=await MyStore.CipherAuthentication(user.username,user.password_digest);
      expect(users).toBeInstanceOf(Object);
      expect(MyStore.CipherAuthentication).toBeDefined();
    });
    it("Test MyIndex model",async function(){
      const users=await MyStore.MyIndex();
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);
    });
   it("Test GetSpecifcUser model",async function()  {
      const users=await MyStore.GetSpecifcUser(user.id as number);
      expect(users?.id).toBeInstanceOf(Number);
      expect(users?.password_digest).toBeInstanceOf(String);  
      expect(MyStore.GetSpecifcUser).toBeDefined();
    });   

    it("Test Delete model",async function(){
      const use=await MyStore.DeleteUser(user.id as number);
      expect(use?.username).toBeInstanceOf(String);
      expect(use?.password_digest).toBeInstanceOf(String);
      expect(MyStore.DeleteUser).toBeDefined();
    });
  });
});

  describe('Test My authentication ', () => {
    const user = {
      username: "ali",
      password_digest: "123"
      // eslint-disable-next-line prettier/prettier
    } as MyUser;

    beforeAll(async () => {
      const conn = await Client.connect();
      await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
      conn.release();
      const createUser = await MyStore.CreateNewUser(user);
      user.id = createUser.id;
    });

    afterAll(async () => {
      const conn = await Client.connect();
      const sql = "delete from users;";
      await conn.query(sql);
      conn.release();
    });

    it("Test My authentication function", async () => {
      const authorized = await MyStore.CipherAuthentication(user.username, user.password_digest);
      expect(authorized?.password_digest).toBeInstanceOf(String);
      expect(authorized?.id).toBeInstanceOf(Number);
    });

    it("Test My authentication function", async () => {
      const notAuthorize = await MyStore.CipherAuthentication("username", user.password_digest);
      expect(notAuthorize?.password_digest).toBeUndefined();
      expect(notAuthorize?.id).toBeUndefined();
    });
  });


describe("Test user API", () => {

  const user = {
    username: "ayman",
    password_digest: "123"
    // eslint-disable-next-line prettier/prettier
  } as MyUser;
  let myToken = "";

  beforeAll(async () => {
    const conn = await Client.connect();
    await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")
    conn.release();
    const createUser = await MyStore.CreateNewUser(user);
    user.id = createUser.id;
  });

  afterAll(async () => {
    const conn = await Client.connect();
    const sql = "delete from users";
    await conn.query(sql);
    conn.release()
  });
  it("Test Create Function", async () => {
  
    const res = await request.post("/user")
      .set("Content-Type", "application/json")
      .send({
        username: user.username,
        password: user.password_digest
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(String);
  });
  it("Take Token ", async () => {

    const res = await request.post("/userAu")
      .set("Content-Type", "application/json")
      .send({
        username: user.username,
        password: user.password_digest
      });
    myToken = res.body;
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(String);
  });
 
  it("Thet My Index", async () => {
    const res = await request.get('/users')
      .set("Content-Type", "application/json")
      .set('Authorization', `Bearer ${myToken}`);
      
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
  
    it("Test My Data", async() => {
      const res = await request.get(`/user?id=${user.id}`)
      .set("Content-Type", "application/json")
      .set('Authorization', `Bearer ${myToken}`);

      
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object); 
     });

     it("Test Delete Function", async() => {
        const res = await request.delete(`/user?id=${user.id}`)
        .set("Content-Type", "application/json")
        .set('Authorization', `Bearer ${myToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toBeNull(); 
       }); 
   
    });  

    

