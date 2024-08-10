import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from "./db/connectDB.js"
import ProtectRoutes from "./middleware/protectRoute.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js"
import Bidroutes from  "./routes/BidRoutes.js"
import Driverroutes from "./routes/DriverRoutes.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Routes
app.use("/api/auth", AuthRoutes)
app.use("/api/", ProtectRoutes, Bidroutes)
app.use("/api/", ProtectRoutes, Driverroutes)
app.use("/api/", ProtectRoutes , OrderRoutes) 
app.use("/api/", ProtectRoutes, supplierRoutes) 

app.listen(PORT, ()=>{
    console.log(`Sever is runnning on port ${PORT}`)
    connectDB();
})
