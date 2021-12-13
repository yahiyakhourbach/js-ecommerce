
import CheckOutSteps from "../component/CheckOutSteps";
import { getshippingUser, setshippinguser } from "../localStorage";


const ShippingScreen ={
    after_render: ()=> {
        document.getElementById("shipping-form")
        .addEventListener("submit", async(e)=>{
            e.preventDefault();

            const address=document.querySelector("#address").value;
            const city=document.querySelector("#city").value;
            const postalcode=document.querySelector("#postalcode").value;
            const country=document.querySelector("#country").value;

            setshippinguser({address,city,postalcode,country});

            document.location.hash="/payment"
                
        })
    },
    render:()=>{
            const{ address,city,postalcode,country} =getshippingUser()
    
    return `
              ${CheckOutSteps.render({step1:true,step2:true})}
                <div class="form-container container">
                    <form id="shipping-form"  autocomplete="off">
                        <ul class="form-items">
                          <li>
                            <h1>shipping</h1>
                          </li>
                          <li>
                          <label for="name">address</label>
                          <input type="text" id="address" name="address" value="${address}" />      
                       </li>
                          <li>
                             <label for="city">city</label>
                             <input type="text" id="city" name="city" value="${city}"/>      
                          </li>
                          <li>
                             <label for="postalcode">postalcode</label>
                             <input type="text" id="postalcode" name="postalcode" value="${postalcode}" />      
                          </li>
                          <li>
                          <label for="country">country</label>
                          <input type="text" id="country" name="country" value="${country}" />      
                       </li>
                          <li>
                             <button type="submit" id="continue">Continue</button>
                          </li>
                        </ul>
                    </form>
                </div>
           
            `
        }
}

export default ShippingScreen