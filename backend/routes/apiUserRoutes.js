import express from 'express'
import { getUser, handleLogin, handleRegistration } from '../controllers/userController.js';
import { handleAuth } from '../middlewares/authmiddleware.js';

const router = express.Router();

// router.post('/register' , handleRegistration);
router.get("/user" ,handleAuth, getUser);
router.post('/login' , handleLogin);

router.use('/user' , (req, res)=>{
    console.log("in the function")
    console.log(req.body);                // this is just for demo line 6 to be used later in actual
    console.log(`shifsd ${req.body.name}`) 
})


export default router;