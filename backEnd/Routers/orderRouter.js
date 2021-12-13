import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import isauth from '../middleware/isauth'
import Order from '../moduls/orderModul'

const orderRouter = express.Router()

orderRouter.post(
    "/",
    isauth,
    expressAsyncHandler(async (req,res)=>{

            const Address = req.body.address
            const City = req.body.city
            const Postalcode= req.body.postalcode
            const Country = req.body.country
            const User=req.user.id
            const order = new Order({
                orderItems:req.body.orderItem,
                user:User,
                shipping:{address:Address,city:City,postalcode:Postalcode,country:Country},
                payment:{paymentmethode:req.body.paymentWay.paymentMethod},
                itemsprice:req.body.orderPrice,
                taxprice:req.body.tax,
                shippingsprice:req.body.shipping,
                totalprice:req.body.totatlPrice
            })
    
            const createdOrder =await order.save()
             res.status(201).send({message:"new order created",
                                   order:createdOrder})
            
    
    
    
   })
)


orderRouter.get("/:id",isauth,expressAsyncHandler(async(req,res)=>{
    try{
        const orderId = req.params.id;
        const order=await Order.findById(orderId);
        
        res.send(order)
    }catch(err){
        res.status(401).send({message:"order not found"})
    }
}))

orderRouter.get("/:id/payment",isauth,expressAsyncHandler(async(req,res)=>{
    const order =await Order.findById(req.params.id)
    if(order){
        order.isPaid=true;
        order.paidAt=Date.now()
        order.payment.payementresult={
            orderID:req.body.orderID,
            payerID:req.body.payerID,
            paymentID:req.body.paymentID
        }
        const orderUpdated=await order.save()
        res.send({message:"order paid",order:orderUpdated})
    }else{
        res.status(404).send({message:"order not found"})
    }

}))
export default orderRouter