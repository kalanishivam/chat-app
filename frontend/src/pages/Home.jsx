import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Tab, Tabs } from '@mui/material'
import Login from '../components/Login';
import Signup from '../components/Signup';
import {useNavigate} from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();

  useEffect(()=>{
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      if(userData){
        navigate("/chats")
      }
  }, [navigate])


  const TabPanel = ({ value, index, children }) => (
    <div hidden={value !== index}>
      {value === index && <>{children}</>}
    </div>
  );

   const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container fixed maxWidth="sm" sx={{ background: "white", height: "640px", marginTop: "40px", boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.3)", borderRadius: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', marginTop: "30px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "400", color : "#1976D2", fontStyle : "revert" }}>LOGIN TO CONTINUE</Typography>
      </Box>
      <hr style={{ border: "1px solid #1976D2" }} />
      <Box>
        <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" aria-label="secondary tabs example" centered sx={{marginBottom : "20px"}}>
          <Tab value="one" label="Login" />
          <Tab value="two" label="Signup" />
        </Tabs>
        
        <TabPanel value={value} index="one">
        <Login />
      </TabPanel>

      <TabPanel value={value} index="two">
        <Signup />
      </TabPanel>
      </Box>


    </Container>
  )
}

export default Home