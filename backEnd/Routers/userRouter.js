import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import isauth from '../middleware/isauth';
import User from '../moduls/userModul';
import { generateToken } from '../util';

const userRouter=express.Router();

userRouter.get("/createadmin",expressAsyncHandler( async (reg,res)=>{
    try{
        const user = new User({
            name:'admin',
            email:'clothea@admin.com',
            password:'12345',
            isAdmin:true
        });
        const createduser = await user.save()
        res.send(createduser)
    }catch(err){
        res.status(500).send({message:err.message})
    }
})
)

userRouter.post(
    "/signin",
    expressAsyncHandler(async (req,res)=>{
        const signinUser= await User.findOne({
            email:req.body.email,
            password:req.body.password
        })
        if(!signinUser){
            res.status(401).send({message:'Invalid password or email'})
        }
        else{
            res.send({
                id:signinUser.id,
                name:signinUser.name,
                email:signinUser.email,
                password:signinUser.password,
                isAdmin:signinUser.isAdmin,
                token:generateToken(signinUser)
            })
        }
    }
) 
)

userRouter.post(
    "/register",
  expressAsyncHandler(async (req,res)=>{
    try {
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        const createdUser = await user.save()
     
        res.send(createdUser)
    } catch (error) {
        res.status(500).send({message:error.message})
    }

}))

userRouter.put(
    "/:id",isauth,
    expressAsyncHandler( async (req,res)=>{
    
            const user = await User.findById(req.params.id);
            if(!user){
                res.status(401).send({message:"this user not exist"})
            }else{
                user.name=req.body.name||user.name;
                user.email=req.body.email||user.email;
                user.password=req.body.password||user.password;
                const updateduser=await user.save()
                 res.send({
                id:updateduser.id,
                name:updateduser.name,
                email:updateduser.email,
                password:updateduser.password,
                token:generateToken(updateduser)
                })
            }

       

    })
    )


export default userRouter