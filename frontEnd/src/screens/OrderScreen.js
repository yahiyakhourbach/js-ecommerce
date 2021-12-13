/* eslint-disable prefer-arrow-callback */
import { GetOrder, getPaypalClientId, payOrder } from "../api";
import { hideLoading, parseReqeustUrl, Rerender, showLoading, showMessage } from "../utile";

const paypalscript = document.getElementsByClassName("paypal-script")
const addPaypalSdk= async(totalprice)=>{
  const clientId = await getPaypalClientId()
  showLoading()

    const script = document.createElement("script")
    script.type="text/javascript"
    script.async=true
    script.classList="paypal-script"
    script.src="https://www.paypalobjects.com/api/checkout.js"
    if(paypalscript.length<1)
    document.body.appendChild(script)
    script.onload=()=>handlePaymnet(totalprice,clientId)
    hideLoading()
}


const handlePaymnet=(totalprice,clientId)=>{
   const price =Math.round(totalprice)
  window.paypal.Button.render({
    env:"sandbox",
    client:{
      sandbox:clientId,
      production:""
    },
    locale:"en_US",
    style:{
      color:"gold",
      size:"responsive",
      shape:"pill"
    },
    commit:true,
    payment(data,actions){
      return actions.payment.create({
        transactions:[{
          amount:{
            total:price,
            currency:"USD"
          }
        }]
      })
    },
    onAuthorize(data,actions){
        return actions.payment.execute().then(async()=>{
          showLoading()
          // call pay order
          await payOrder(parseReqeustUrl().id,{
            orderID:data.orderID,
            payerID:data.payerID,
            paymentID:data.paymentID
          })
          hideLoading()
          showMessage("payment was successfull",()=>{
            Rerender(OrderScreen)
          })
        })
    }
  },"#paypal-button").then(()=>{
    hideLoading()
  })
 

}

const OrderScreen={
    after_render: ()=>{


    },
    render:async()=>{
      const {id}=parseReqeustUrl();
    const {
      _id,
      orderItems,
      shipping,
      payment,
      itemsprice,
      taxprice,
      shippingsprice,
      totalprice,
      isPaid,
      paidAt,
      
    } = await GetOrder(id)
    if(!isPaid){
      addPaypalSdk(totalprice)
    }
     console.log(isPaid)
   return `
   <h1 class="container">Order ${_id}</h1>
   <div class="placeorder-container container">
  
       <div class="list-info">
          <div class="shipping-container">
            <div>
            <h3>shipping address:</h3>
            <p>${shipping.address},${shipping.city}, ${shipping.postalcode}, ${shipping.country}</p>
            </div>
          </div>
          <div class="payment-way">
             <h3>payment way: </h3>
             <p>payment methode: ${payment.paymentmethode}</p>
             <p>${isPaid?`paid At:${paidAt || ``}`:`not paid`}</p>
          </div>
          <div class="items-list">
                <ul>
                    <div class="shipping-cart-wrapper">
                      <div>Shipping cart</div>
                      <div>Price</div>
                    </div>
                    ${orderItems.map((item)=>`
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
            <h3>Order Summery</h3>
             <div class="order-detailes">
                <div class="order-info">
                    <div>order Price:</div>
                    <div>$${itemsprice}</div>
                </div>
                 <div class="order-info">
                    <div>shipping:</div>
                    <div>$${shippingsprice}</div>
                </div>
                <div class="order-info">
                    <div>Tax:</div>
                    <div>$${taxprice}</div>
                </div>
                <div class="order-info total-price">
                     <div>Total Price:</div>
                    <div>$${Math.round(totalprice)}</div>
                </div>
              </div>
                
              <div id="paypal-button"></div>
             
                
        </div>
    </div>

`
    }


}

export default OrderScreen