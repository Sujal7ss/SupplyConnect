import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from "./db/connectDB.js";
import supplierAuthRoutes from "./routes/supplierAuthRoutes.js";
import supplierUserRoutes from "./routes/supplierUserRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Routes
app.use("/api/supplierAuth", supplierAuthRoutes)
app.use("/api/supplierUser", supplierUserRoutes)

app.listen(PORT, ()=>{
    console.log(`Sever is runnning on port ${PORT}`)
    connectDB();
})
