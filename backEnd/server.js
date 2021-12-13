import express from 'express';
import cors from 'cors'; 
import  mongoose  from 'mongoose';
import data from './data';
import config from './config';
import userRouter from './Routers/userRouter';
import orderRouter from './Routers/orderRouter';



mongoose.connect(config.MONGODB_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=>{
  console.log('connceted successfully')
}).catch((error)=>{
  console.log(error)
})
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/users",userRouter)
app.use("/api/orders",orderRouter)
app.get("/api/paypal/clientid",(req,res)=>{
    res.send({clientId:config.PAYPAL_CLIENT_ID})
})
app.get('/api/product', (req, res) => {
  res.send(data.products);
});
app.get('/api/product/:id', (reg, res)=>{
   const responce = data.products.find((x)=>x.id === reg.params.id)
   if(responce){
     res.send(responce)
   }
   else{
     res.status(404).send({message:"product not found !!"})
   }
})
// eslint-disable-next-line no-unused-vars
app.use((err,req,res,next)=>{
  const status =err.name &&err.name==='ValidationError'?400:500
  res.status(status).send({message:err.message})
})

app.listen(5000, () => {
  console.log('app serv successfully');
});

