import express from "express";
import { configDotenv } from "dotenv";
import { connectDatabase } from "./database";
import { foodOrderRouter, authRouter, foodCategoryRouter } from "./routers";

const app = express();

configDotenv();
connectDatabase();

const port = 8000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/food-category", foodCategoryRouter);
app.use("/food-order", foodOrderRouter);

app.listen(port, () => console.log(`http://localhost:${port}`));
