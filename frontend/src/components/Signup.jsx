import React, { useState } from 'react'
import {useNavigate}  from 'react-router-dom'
import { Stack, TextField, FormControl, Typography, Button, Box, InputAdornment, IconButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUer } from '../services/api';
import  loader from '../Assets/ZZ5H.gif'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [pic, setPic] = useState();
    const [confirmPassword, setConfirmPassword] = useState(); 
    const navigate = useNavigate();
    const [isLoading , setLoading] = useState(false);

    const VisuallyHiddenInput = (props) => {
        <input
            type="file"
            {...props} />
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSignup = async () => {
        try{
        if (!name || !password || !email) {

        toast.warn("PLEASE ENTER ALL DETAILS");
        return;
        }else if(password !== confirmPassword){
            toast.warn("Passwords do not match");
            return
        }else{
            // console.log("successful")
            setLoading(true);
            let data = {
                name :name,
                email : email,
                password : password,
                pic : "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
            }
            console.log('passed all function')
            await registerUer(data);
            navigate('/chat');
        }
    }catch(error){
        console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
    }finally{
        setLoading(false);
    }
        
    }


    return (
        <>
        <Stack spacing={2} >
            <FormControl fullWidth margin="normal" required>
                <Typography>Name</Typography>
                <TextField id="name" placeholder="Name" variant="outlined" required onChange={(e) => { setName(e.target.value) }} />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
                <Typography>Email</Typography>
                <TextField id="email" placeholder="email" variant="outlined" required onChange={(e) => { setEmail(e.target.value) }} />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
                <Typography>Password</Typography>
                <TextField
                    id="password"
                    placeholder="Create your password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
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

            <FormControl fullWidth margin="normal" required>
                <Typography> Confirm your Password</Typography>
                <TextField
                    id="confirmpassword"
                    placeholder="Confirm your password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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



            <FormControl margin="normal">
                <Box sx={{ display: 'flex', gap: '15px' }}>
                    <Typography>Display Picture</Typography>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onChange={(e) => { setPic(e.target.value) }}>
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Box>
            </FormControl>
            <Button onClick={handleSignup} variant='contained' disabled = {isLoading}> {isLoading ? <img src={loader} height='25px' width='30px' alt='loading...'/> : "Signup"}</Button>
        </Stack>
<ToastContainer position='top-center'/>
        </>
    )
}

export default Signup