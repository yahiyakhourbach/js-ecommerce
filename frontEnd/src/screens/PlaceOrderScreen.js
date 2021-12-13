import { PlaceOrder } from "../api";
import CheckOutSteps from "../component/CheckOutSteps";
import { cleancart, getCartItems, getpayment, getshippingUser } from "../localStorage"
import { hideLoading, showLoading, showMessage } from "../utile";

const getOrderInfo=()=>{
   const orderItem = getCartItems();
   const paymentWay = getpayment();
   const {address,city,postalcode,country} = getshippingUser();

   const orderPrice = orderItem.reduce((a,c)=>a + c.Qty*c.price,0)
   const shipping = orderPrice > 100 ? 0 : 10
   const tax = Math.round(0.5*orderPrice)/100
   const totatlPrice = orderPrice + shipping + tax
   
   return {
       orderItem,
       orderPrice,
       shipping,
       address,
       city,
       postalcode,
       country,
       totatlPrice,
       tax,paymentWay
   }
}


const PlaceOrderScreen={
    after_render: ()=>{

      document.getElementById("place-order-btn")
      .addEventListener("click",async ()=>{
        const order = getOrderInfo();
        showLoading()
        const data= await PlaceOrder(order)
         hideLoading()
         if(data.error){
         showMessage(data.error)
        }else{
           cleancart()
          document.location.hash=`/order/${data.order._id}`
        }
      })

    },
    render:()=>{
const {orderItem,orderPrice,shipping,address,city,postalcode,country,totatlPrice,tax,paymentWay } = getOrderInfo()
 
   return `
     ${CheckOutSteps.render({step1:true,step2:true,step3:true,step4:true})}
    <div class="placeorder-container container">
       <div class="list-info">
          <div class="shipping-container">
            <div>
            <h3>shipping address:</h3>
            <p>${address},${city}, ${postalcode}, ${country}</p>
            </div>
          </div>
          <div class="payment-way">
             <h3>payment way: </h3>
             <p>payment methode: ${paymentWay.paymentMethod}</p>
          </div>
          <div class="items-list">
                <ul>
                    <div class="shipping-cart-wrapper">
                      <div>Shipping cart</div>
                      <div>Price</div>
                    </div>
                    ${orderItem.map((item)=>`
                        <li>
                        <div class="image-item-container">
                          <img  src='${item.img}' alt='${item.name}'/>
                        </div>
                        <div class="item-order-detailes">
                            <div>
                              <div class="product-title">${item.name}</div>
                              <div class="qty">Qty: ${item.Qty}</div>
                            </div>
                            <div>${item.price}</div>
                        </div>
                        </li>
                        `).join(" ")}
                </ul>
          </div>
       </div>
        <div class="order-summery">
            <h3>Ordr Summery</h3>
             <div class="order-detailes">
                <div class="order-info">
                    <div>order Price:</div>
                    <div>$${orderPrice}</div>
                </div>
                 <div class="order-info">
                    <div>shipping:</div>
                    <div>$${shipping}</div>
                </div>
                <div class="order-info">
                    <div>Tax:</div>
                    <div>$${tax}</div>
                </div>
                <div class="order-info total-price">
                     <div>Total Price:</div>
                    <div>$${Math.round(totatlPrice)}</div>
                </div>
              </div>
             <div>
                <button class="place-order-button" id="place-order-btn">place order</button>
             </div>
        </div>
    </div>

`
    }


}

export default PlaceOrderScreen