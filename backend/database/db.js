import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();

const URI = process.env.DB_URI;


 const connectTODB = async ()=>{
try{
    await mongoose.connect(URI)
    console.log(`connected to the database`)

}catch(error){
    console.log(`error in connectTODB function :  ${error.message}`)
}
}


export default connectTODB;