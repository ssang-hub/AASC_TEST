import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/index.js";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(route);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
