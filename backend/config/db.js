import  mongoose from "mongoose";

export const connectTODB = async (URI)=>{
    try{
        await mongoose.connect(URI);
        console.log("CONNECTION TO THE DATABASE ESTABLISHED")
        
    }catch(error){
        console.log("error in the connect to database function" + error.message)
    }
}