import express from "express";
import { configDotenv } from "dotenv";
import { connectDatabase } from "./database";

const app = express();

configDotenv();
connectDatabase();

const port = 8000;

app.get("/", () => {});

app.listen(port, () => console.log(`http://localhost:${port}`));
