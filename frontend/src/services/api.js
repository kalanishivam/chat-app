import axios from 'axios';

const URL = "http://localhost:5000";

export const registerUer = async (data)=>{
try{
    const headers = {
      'Content-Type': 'application/json',
    }
     const response = await axios.post(`${URL}/api/user` , data ,{headers});
     return response.data;
}catch(error){
    console.log(`error in register user ${error.message}`)
}
}   


export const checkPassword = async (data)=>{
  try{
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await axios.post(`${URL}/api/login` , data , {headers});
    return response.data;
  }catch(error){
    console.log("error in check password " , error.message);
  }
}