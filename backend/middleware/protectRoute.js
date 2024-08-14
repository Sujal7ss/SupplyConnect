import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ error : "Unauthorized : No token found"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET).email;
        console.log(decoded);
        if(!decoded){
            return res.status(401).json({ error : "Unauthorized : Invalid token"})
        }
        console.log(decoded);
        // if(type === 'supplier'){
        //     const user = await Supplier.findOne({email:decoded.email}).select("-password");
        //     if (!user) {
        //         return res.status(404).json({ error: "User not found" });
        //     }
        // }
        // else if(type === 'driver'){
        //     const user = await Driver.findOne({email:decoded.email}).select("-password");
        //     if (!user) {
        //         return res.status(404).json({ error: "User not found" });
        //     }
        // }
        // req.user = user
        next();
    }
    catch(error){
        console.error("Error in protectedRoute middleware : ", error.message);
        return res.status(500).json({ error : "Internal Server Error"})
    }
};

export default protectRoute;