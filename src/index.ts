import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./Handelrs/user";
import productsRoutes from "./Handelrs/product";
import orderRoutes from "./Handelrs/order";


dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan("short"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
productsRoutes(app);
userRoutes(app);
orderRoutes(app);
// add routing for / path
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World 🌍",
  });
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});

export default app;