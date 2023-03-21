import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/authRoutes.js";

dotenv.config();
const mongoStr = process.env.DB_URL;
mongoose.connect(mongoStr);
// const connection = mongoose.Connection;
// connection.on("connection",()=>console.log("database connnected"))
const port = process.env.PORT;
const app = express();
app.use(bodyParser.json({ limit: "50mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: "true" }));
app.use(cors());
app.use(express.json());
app.use("/api/user", router);

app.listen(port, () => console.log(`server is running on ${port}`));
