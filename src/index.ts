import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// DB connect

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connecting to db");
  })
  .catch(() => {
    console.log("Error connect to db");
  });

// Base route
app.get("/", (req: Request, res: Response) => {
  const { test } = req.query;
  if (test) {
    res.status(200).json({ message: "is test!" });
  } else {
    res.status(200).json({ message: "Hello!" });
  }
});

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
