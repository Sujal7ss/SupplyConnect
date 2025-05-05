import jwt from "jsonwebtoken";
import Supplier from "../models/supplier.js";
import Driver from "../models/Driver.js";


const protectRoute = async (req, res, next) => {
    try {
        console.log("Inside protectedRoute middleware");
        console.log(req.cookies)
        const token = req.cookies.jwt;
        const typeOfUser = req.cookies.typeofUser
        let user = null;
        if(!token){
            return res.status(401).json({ error : "Unauthorized : No token found"})
        }
        const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
        if(!userId){
            return res.status(401).json({ error : "Unauthorized : Invalid token"})
        }

        if(typeOfUser === 'supplier'){
            user = await Supplier.findOne({_id: userId}).select("-password");
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
        }
        else if(typeOfUser === 'driver'){
            user = await Driver.findOne({_id: userId}).select("-password");
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
        }
        req.user = user
        req.typeOfUser = typeOfUser
        next();
    }
    catch(error){
        console.error("Error in protectedRoute middleware : ", error.message);
        return res.status(500).json({ error : "Internal Server Error"})
    }
};

export default protectRoute;