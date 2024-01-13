import React, {useState} from 'react'
import { TextField, Box, styled, Button, Stack, FormControl, Typography, InputAdornment, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  loader from '../Assets/ZZ5H.gif'
import {useNavigate} from 'react-router-dom'
import { checkPassword } from '../services/api';


// const ParentBox = styled(Box)({
//     display : "flex", 
//     flexDirection : "column",
//     alignItems : "center",
// })

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

      const handleClick = async()=>{
        try{
        if(!email || !password){
          toast.warn("PLEASE FILL ALL DETAILS");
          return;
          //to add one more else if to check if the passwords actully match done after adding the database
        }else{
          let data = {
            email : email,
            password : password
          }
          setLoading(true);
          const response = await checkPassword(data);
          if(response && response.success == 'login'){

            navigate('/chat')
          }else{
            toast.error( response?.error ||"WRONG EMAIL OR PASSWORD! PLEASE TRY AGAIN!")
          }
          // if()  // implemtn this first and check chatgpt for further instrucitons
        }
      }catch(error){
        toast.warn('ERROR IN LOGGING IN PLEASE TRY AGAIN');
        console.log(`error in catch ${error}`)
      }finally{
        setLoading(false);
      }
      }
    return (
      <>
        <Stack spacing={3} sx={{ alignItems: "center" }}>
            <FormControl fullWidth margin="normal" required>
                <Typography>Email</Typography>
                <TextField  id="email" placeholder = "email" variant="outlined" required onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
                <Typography>Password</Typography>
                <TextField
      id="password"
      placeholder="Password"
      variant="outlined"
      type={showPassword ? 'text' : 'password'}
      onChange={(e)=>setPassword(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
            </FormControl>
            <Button variant="contained" sx={{ width: 320 }} onClick={handleClick} disabled = {isLoading}>{isLoading? <img src = {loader} height='30px' alt = "loading.." /> : "Submit"}</Button>
        </Stack>
        <ToastContainer position='top-center'/>
        </>
        
        // <ParentBox>
        //     <TextField sx={{ width: 320, marginBottom: '20px' }} id="outlined-basic" label="Email address" variant="outlined" required />
        //     <TextField sx={{ width: 320, marginBottom: '20px' }} id="outlined-basic" label="Password" variant="outlined" required />
        //     <Button variant="contained" sx={{width : 320}}>Submit</Button>
        // </ParentBox>
    )
}

export default Login