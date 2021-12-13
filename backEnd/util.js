import jwt from "jsonwebtoken"
import  config  from "./config"

export const generateToken=(user)=>{
    const token = jwt.sign({
        id:user.id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,

    },config.JWT_TOKEN)  

    return token

}
 