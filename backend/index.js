import express from 'express';
import apiUserrouter from './routes/apiUserRoutes.js';
import chatRoutes from './routes/chatRoutes.js'
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();
app.use(cors());
const PORT = 5000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.get("/" , (req, res) =>{
    res.send("hello")
})

app.use('/api' , apiUserrouter);

app.use('/api/chat' , chatRoutes);   // it is not imported yet
// app.post("/api/user" , (req, res)=>{
//     console.log("the data is", req.body);
//     const {name, email, password} = req.body;
//     console.log(`name is ${name} , password is ${password} , email is ${email}`)
// })


app.listen(PORT , ()=>{
    console.log(`Server started on port ${PORT}`)
})