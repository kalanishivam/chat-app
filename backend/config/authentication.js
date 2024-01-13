import jwt from 'jsonwebtoken'

const secret = "PUT THAT IN THE ENV FILE LATER"

export const generateToken = (id)=>{
    return jwt.sign({id} , secret,{
        expiresIn : '20d',
    })
}