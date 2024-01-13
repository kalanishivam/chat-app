import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name : {
        type : String, 
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    pic : {
        type : String,
        required : true,
        default : "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
    }
}, {
    timestamps : true
})


userSchema.methods.matchPassword = async function (responsePassword){
    return await bcrypt.compare(responsePassword , this.password);
}


userSchema.pre('save' ,  async function (next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password  , salt);
})

const userDetails = model("users", userSchema);
export default userDetails;