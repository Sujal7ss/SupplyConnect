import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from "./db/connectDB.js"
import supplierRoutes from "./routes/supplierRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js"
import Bidroutes from  "./routes/BidRoutes.js"
import cors from "cors"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Routes
app.use("/api/auth", AuthRoutes)
app.use("/api/", Bidroutes)
app.use("/api/driver", ProtectRoutes, Driverroutes)
app.use("/api/driver" , OrderRoutes)
app.use("/api/", supplierRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is runnning on port ${PORT}`)
    connectDB();
})
