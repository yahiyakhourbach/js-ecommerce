
import CheckOutSteps from "../component/CheckOutSteps";
import {  setpayment } from "../localStorage";


const ShippingScreen ={
    after_render: ()=> {
        document.getElementById("payment-form")
        .addEventListener("submit", (e)=>{
            e.preventDefault();

            const paymentMethod=document.querySelector("input[type='radio']:checked").value;
            setpayment({paymentMethod})
            document.location.hash="/placeorder"                
        })
    },
    render:()=>`
              ${CheckOutSteps.render({step1:true,step2:true,step3:true})}
                <div class="form-container container">
                    <form id="payment-form"  autocomplete="off">
                        <ul class="form-items">
                          <li>
                            <h1>Payment Way</h1>
                          </li>
                          <li>
                          <input type="radio" id="PAYPAL" name="payment-methode" value="PAYPAL"  />      
                          <label for="name">PAYPAL</label>
                       </li>
                          <li>
                          <input type="radio" id="STRIPE" name="payment-methode" value="STRIPE" />      
                             <label for="STRIPE">STRIPE</label>
                          </li>
                          <li>
                             <button type="submit" id="continue">Continue</button>
                          </li>
                        </ul>
                    </form>
                </div>
           
            `
}

export default ShippingScreen