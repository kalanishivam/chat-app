import chatDetails from "../models/chatmodel.js";
import userDetails from "../models/userModel.js";

export const chatAccess = async (req, res) => {
    const { userId } = req.body;

    var isChat = await chatDetails.find({
        isGroupChat: false,
        $and: [
            { users: { $eleMatch: { $eq: req.user._id } } },
            { users: { $eleMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage")
    // .populate({
    //     path: "latestMessage.sender",
    //     select: "name pic email",
    // });
    isChat = await userDetails.populate(isChat, {        // User.populate
        path: "latestMessage.sender",
        select: "name pic email"
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
    }

    try {
        const createdChat = await chatDetails.create(chatData);
        const fullChat = chatDetails.findOne({ _id: createdChat._id }).populate("users", "-password");

        res.status(200).send(fullChat);
    } catch (error) {
        console.log(`error in chat controller ${error.message}`)
    }
}

export const getChats = async (req, res) => {
    try {
        const result = await chatDetails.find({ users: { $eleMatch: { $eq: req.user._id } } }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 });
        result = await userDetails.populate(result, {
            path: "latestMessage.sender",
            select: "name pic email"

        })
        res.status(200).send(result);
    } catch (error) {
        res.status(400);
        throw new error(error.message);
    }
}


export const createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the details" });
    }

    var users = JSON.parse(req.body.users);
    users.push(req.user);

    try {
        const groupChat = await chatDetails.create({
            chatname: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user
        });
        const fullGroupChat = chatDetails.findOne({ _id: groupChat._id }).populate("users", "-password").populate("groupAdmin", "-password")
        res.status(200).json(fullGroupChat)
    } catch (error) {
        console.log(`error in create group chat ${error.message}`)
        res.status(400).send({ message: `error in creating group : ${error.message}` })
    }
}


export const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;
    const updatedChat = await chatDetails.findByIdAndUpdate(chatId, { chatName: chatName }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

}


export const addToGroup = async (req, res) => {
    const { chatId, chatName, userId } = req.body;

    const added = await chatDetails.findByIdAndUpdate(chatId,
        {
            $push: { users: userId }
        }
        , {
            new: true
        }).populate("users", "-password").populate("groupAdmin", "-password")

        if(!added){
            res.status(400)
            throw new error("not added please try again");

        }else{
            res.status(200).json(added);
        }
}



export const removeFromGroup = async(req, res)=>{
    const {chatId, userId} = req.body;

    const removed = await chatDetails.findByIdAndUpdate(chatId, {$pull : {users : userId}}, {new:true}).populate("users", "-password").populate("groupAdmin", "-password");
    if(!removed){
        res.status(400);
        throw new error("not removed! try again later");

    }else{
        res.status(200).json(removed);
    }
}