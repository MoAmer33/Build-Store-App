# Storefront Backend Project

## Setup ##

### Database config ###

Api connect to the database.,And create two database.And Run the command `psql postgres` in terminal to open the postgres 

```SQL
CREATE USER postgres WITH PASSWORD 'YOUR_PASSWORD_HERE';
CREATE DATABASE store_dev;
\c store_dev;
GRANT ALL PRIVILEGES ON DATABASE store_dev TO postgres;
CREATE DATABASE store_test;
\c store_test;
GRANT ALL PRIVILEGES ON DATABASE store_test TO postgres;
````

Build database.json to connect to database 

```json
{
"defaultEnv": {"ENV":"Node_Env"},

    "dev": {
      "driver":"pg",
      "host": { "ENV": "POSTGRES_HOST" },
      "port": { "ENV": "POSTGRES_PORT" },
      "database": { "ENV": "POSTGRES_DB" },
      "user": { "ENV": "POSTGRES_USER" },
      "password": { "ENV": "POSTGRES_PASSWORD" }
    },
    "test": {
        "driver":"pg",
        "host": { "ENV": "POSTGRES_HOST" },
        "port": { "ENV": "POSTGRES_PORT" },
        "database": { "ENV": "POSTGRES_TEST_DB" },
        "user": { "ENV": "POSTGRES_USER" },
        "password": { "ENV": "POSTGRES_PASSWORD" }
    }
  } 
```

### Environment variables 

| Name              | Value            | 
| ------------------|:----------------:|
| POSTGRES_HOST     | 127.0.0.1        | 
| POSTGRES_DB       | store_dev        |    
| POSTGRES_TEST_DB  | store_test       | 
| POSTGRES_USER     | postgres         | 
| POSTGRES_PASSWORD | 123              | 
| NODE_ENV          | dev              | 
| POSTGRES_PORT     | 5432
| PORT              | 3000             |
| SALT_ROUNDS       | 10               |
| TOKEN_SECRET      | tokensecure      | 
#### How to run the project 
- run in production mode `npm start server`
- run in test mode `npm test`

#### Product API
1. to create product you should have token and go to api and send `name` and `price`  `http://localhost:3000/product`  
2. to get all products `http://localhost:3000/products`

3. to get top 3 popular products `http://localhost:3000/productTop`

4. to get one product by `id` send values in req.query `http://localhost:3000/product`

5. to delete product by `id` send values in req.body `http://localhost:3000/product`

#### user API
1. to Come user `name` and  by id`password_digest`  `http://localhost:3000/user`  

2. to Come with all user  `http://localhost:3000/users`

3. to get username and password make login`http://localhost:3000/userAu`


#### Order API

1.  To create order you should go to api and send `status` and `user_id`  `http://localhost:3000/order`  
2. To get all orders you should have token `http://localhost:3000/orders`

3. To delete order`http://localhost:3000/order`

4. To get all specific order you should send id `http://localhost:3000/order`
