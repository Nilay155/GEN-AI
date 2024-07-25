import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const authentication = async (req,res,next) => {
    // User is signed in so the cookie has the accesstoken information
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            return res
            .status(404)
            .json({message : "Unauthorized Request"})
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            return res
            .status(404)
            .json({message : "Unauthorized Request"})
        }
    
        req.user = user;
        next()

    } catch (error) {
        return res
        .status(404)
        .json({message : error.message || "Invalid Token"})
    }

}