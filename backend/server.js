import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from "./db/connectDB.js"
import ProtectRoutes from "./middleware/protectRoute.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Routes
app.use("/api/auth", AuthRoutes)
app.use("/api/", ProtectRoutes, supplierRoutes)

app.listen(PORT, ()=>{
    console.log(`Sever is runnning on port ${PORT}`)
    connectDB();
})
