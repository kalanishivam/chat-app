import { generateToken } from "../config/authentication.js";
import userDetails from "../models/userModel.js";


export const handleRegistration = async (req, res) => {
    try {
      const { email, name, password, pic } = req.body;

      if (!email || !name || !password) {
        res.status(400).json({ error: "Please enter all the information" });
        return;
      }
  
      const existingUser = await userDetails.findOne({ email });
  
      if (!existingUser) {
        // Hash the password before storing
        // const hashedPassword = await bcrypt.hash(password, 10);
  
        const user = await userDetails.create({
          name: name,
          password: hashedPassword,
          pic: pic,
          email: email,
        });
  
        res.status(201).json({ message: "User registered successfully" , name : user.name, email : user.email, id : user._id , token : generateToken(user._id)});
      } else {
        res.status(400).json({ error: "User already exists!" });
      }
    } catch (error) {
      console.error(`Error in handle registration function: ${error.message}`);
      res.status(500).json({ error: "Server error" });
    }
  };

export const handleLogin = async (req, res) => {
    // const { email, password } = req.body;
    // if(password == "1"){             this was just for testing that if the api is working properly
    //   return res.status(200).json({success : "login"})
    // }else{
    //   return res.status(400).json({error : "wrong password"})
    // }
    try {
      const user = await userDetails.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "Please register before trying to login" });  
      } else {
        // Assuming user.password is hashed, you need to use a proper password comparison method
        if (await userDetails.matchPassword(password)) {
          res.status(200).json({ success : "login" , name: user.name , id : user._id , email : user.email, token : generateToken(user._id) });
        } else {
          res.status(400).json({ error: "Please login with correct credentials" });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };



  export const getUser = async (req, res) =>{
    try{  
        const keyword = req.query.search ? {
          $or:[
            {name : {$regex : req.query.search , $options : "i"}},
            {email : {$regex : req.query.searc , $options : "i"}}
          ]
        }:{}
          const users = await userDetails.find(keyword).find({_id : {$ne :req.user._id }})


    }catch(error){
      console.log("error in getUser", error.message);
    }
  }