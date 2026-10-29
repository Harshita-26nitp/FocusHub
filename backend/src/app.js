import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";
const app=express();
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1",router);
export default app;
