import express from "express";
import { configDotenv } from "dotenv";
import { authRouter } from "./routers/auth.router";
import { connectDatabase } from "./database";
import { foodCategoryRouter } from "./routers/food-category.router";

const app = express();

configDotenv();
connectDatabase();

const port = 8000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("food-category", foodCategoryRouter);

app.listen(port, () => console.log(`http://localhost:${port}`));
