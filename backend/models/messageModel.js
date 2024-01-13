import { Schema, model } from "mongoose";


const messageSchema  = new Schema({
    sender : {
        type : Schema.Types.ObjectId,
        ref : "users"
    },
    content : {
        type : String,
        trim : true
    },
    chat : {
        type : Schema.Types.ObjectId,
        ref : "chats"
    }
}, {
    timestamps : true
});


const messageDetails = model("messages" , messageSchema);
export default  messageDetails;