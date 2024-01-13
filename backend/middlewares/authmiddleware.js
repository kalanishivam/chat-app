import jwt from 'jsonwebtoken'
import userDetails from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config();

export const handleAuth  = async(req, res , next)=>{
 let token; 

 try{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];  
        try{  
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        }catch(error){
            res.status(401).json({ error: "Unauthorized. Invalid token." });
        }
        req.user = await userDetails.findById(decoded.id).select("-password");
        next();
    }else{
        res.status(401).json({ error: "Unauthorized. No valid token provided." });
    }
 }catch(error){
    console.log(`error in handlAuth middleware ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
 }
}