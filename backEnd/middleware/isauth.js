import jwt from "jsonwebtoken"
import config from "../config"


const isauth =(req,res,next)=>{
const BearerToken = req.headers.authorization

if(!BearerToken){
    res.status(401).send({message:"token is not supplied"})
}
else{
    const token = BearerToken.slice(7,BearerToken.length)
    jwt.verify(token,config.JWT_TOKEN,(err,data)=>{
        if(err){
            res.status(401).send({message:"invalid token studpid"})
        }else{
            req.user=data
            next()
        }
    })
}
}
export default isauth