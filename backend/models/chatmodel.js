import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    chatname : {
        type : String,
        trim : true
    },
    isGroupChat :{
        type : Boolean,
        default : false
    },
    users : [{
        type : Schema.Types.ObjectId,
        ref : "users"
    },],
    latestmessage : {
        type : Schema.Types.ObjectId,
        ref : "messages"
    },
    groupAdmin : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {
    timeseries : true,
});

const chatDetails = model("chats" , chatSchema);
export default chatDetails;