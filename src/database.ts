import dotenv from 'dotenv'
import { Pool } from 'pg';

dotenv.config();


const {
    PORT,
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    TOKEN_SECRET,
}=process.env; 


let client: Pool = new Pool({
    host:POSTGRES_HOST,
    database:NODE_ENV==='dev'?POSTGRES_DB:POSTGRES_DB_TEST,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
   
});

export default client;

