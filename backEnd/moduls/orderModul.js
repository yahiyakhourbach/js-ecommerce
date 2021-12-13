import mongoose from 'mongoose'

const orderschemma=new mongoose.Schema({
    orderItems:[
        {
            name:{type:String, required:true},
            img:{type:String,required:true},
            Qty:{type:Number,reqruired:true},
            price:{type:Number,reqruired:true},
            prodcut:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true}
        }
    ],
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    shipping:{
        address:String,
        city:String,
        postalcode:String,
        country:String
    },
    payment:{
        paymentmethode:String,
        payementresult:{
            orderID:String,
            payerID:String,
            paymentID:String
        }
    },
    itemsprice:Number,
    taxprice:Number,
    shippingsprice:Number,
    totalprice:Number,
    isPaid:{type:Boolean,required:true, default:false},
    paidAt:Date,
    isDelivered:{type:Boolean,required:true, default:false},
    deliveredAt:Date

},

{
    timestamps:true
})

const Order = mongoose.model("order",orderschemma)
export default Order