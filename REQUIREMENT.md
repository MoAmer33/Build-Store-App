API Requirements
This is the second project in udacity and this wonderful project it is full of knowledge and i get more experience 
this project i use it postgres nodejs jasmine and type script.
Now i know more information for Api


API Endpoints
Products
My_Product /products [get] 
MyData /product [get] take "id" 
CreateProduct /product [post] take "name,price" [token required] 
[OPTIONAL] Top 3 most popular productTop /GetProduct [get] 
Delete /product [delete]  delete my product by id
Users

MyUserr /users [get] [token required] 
MyData /user [get] take "id" [token required] 
CreateUser /user [post] take "username,password_digest"
DeleteUser /user [delete] take "id" 
Authentication /userAu [post] when make log in and compare my username and password with in database

Orders
MyData /order [get] take "id" [token required] 
CreateOredr /orders [post] take "username,password_digest" 
DeleteOrder /order [delete] take "id" 
GetProductOrder /orders [get]get all order



## Data Shapes
#### Product
id 
name 
price 
CREATE TABLE products (id SERIAL PRIMARY KEY,name VARCHAR(64) NOT NULL,price integer NOT NULL);

| Column        | Type               |
| ------------- |:------------------:|
| id            | SERIAL PRIMARY KEY |
| name          | VARCHAR            |
| price         | INTEGER            |

#### User
id 
username 
password  
CREATE TABLE users ( id SERIAL PRIMARY KEY,username VARCHAR(100),password_digest VARCHAR);

| Column        | Type               |
| ------------- |:------------------:|
| id            | SERIAL PRIMARY KEY |
| username      | VARCHAR            |
|password_digest| VARCHAR            |

#### Orders
id 
id of each product in the order 
quantity of each product in the order 
user_id 
status of order (active or complete)  
CREATE TABLE orders (id SERIAL PRIMARY KEY,status VARCHAR(15), user_id bigint REFERENCES users(id));

| Column        | Type                        |
| ------------- |:---------------------------:|
| id            | SERIAL PRIMARY KEY          |
| user_id       | FOREIGN KEY to USERS        |
| status        | active OR completed 

