
import { GetProduct } from "../api";
import { getCartItems, setCartItem } from "../localStorage";
import { hideLoading, parseReqeustUrl, Rerender, showLoading } from "../utile"

const addToCard = (item, forceUpdate=false)=> {
  let cartItems = getCartItems()
  const existItem = cartItems.find((x)=>x.prodcut === item.prodcut)
  if(existItem){
    if(forceUpdate){
      cartItems= cartItems.map((x) => x.prodcut === existItem.prodcut ? item : x)
    }
  }
  else{
    cartItems=[...cartItems,item]
  }
  setCartItem(cartItems)

  if(forceUpdate){
    Rerender(CartScreen)
  }

}
const RemoveItem =(id)=>{
   const item=getCartItems().filter((x)=>x.prodcut !==id)
   setCartItem(item);
   if(parseReqeustUrl().id===id){
     document.location.hash='/cart'
   }else{
     Rerender(CartScreen)
   }
}
const CartScreen ={
    after_render:()=>{
          document.getElementById("checkout")
          .addEventListener("click",()=>{
            document.location.hash="/shipping" 
          })

          const QtySelects=document.getElementsByClassName("Qty_select");
          Array.from(QtySelects).forEach(QtySelect => {
                  QtySelect.addEventListener('change',(e)=>{
                    const item =getCartItems().find(x=>x.prodcut===QtySelect.id)
                    addToCard({...item,Qty:Number(e.target.value)},true)                    
                })
          });
          const DeleteButton = document.getElementsByClassName('delete_button');
          Array.from(DeleteButton).forEach(DeleteBtn=>{
            DeleteBtn.addEventListener('click',()=>{
               RemoveItem(DeleteBtn.id)
            })
          })
    },

    render: async ()=>{
      showLoading();
        const request =parseReqeustUrl();
        if(request.id){
            const product= await GetProduct(request.id)
            hideLoading()
            addToCard({
                prodcut:product.id,
                name:product.name,
                img:product.image,
                brand:product.brand,
                countInStock:product.countInStock,
                price:product.price,
                category:product.category,
                Qty:1

            })
            
           
        }
        
        const cartItems=getCartItems();
        if(getCartItems().length ===0){
            return `<div class="container">
                    <div>card is empty go shopping</div>
            </div>`
        }
        return `
          <div class="card_container container">
                <div class="list_container">
                    <ul>
                        <li class="card_header">
                            <h3>Itmes</h3>
                            <div>price</div>
                        </li>
                        ${cartItems.map((item)=>`
                             <li class="card_item">
                                <div class="card_img">
                                  <img src='${item.img}' alt='${item.name}'>
                                </div>
                                <div>
                                <div><strong>${item.name}</strong></div>
                                <div class="cart_options">
                                <div class="cart_action">
                                      Qty:<select id="${item.prodcut}" class="Qty_select">
                                          ${ [... Array(item.countInStock).keys()].map((x)=>
                                            item.Qty === x + 1 
                                            ? `<option  selected value="${x+1}">${x+1} </option>`
                                            : `<option  value="${x+1}">${x+1} </option>`).join("")}
                                              
                                            
                                            
                                      </select>
                                     
                                </div>
                                      <div class="button_delete">
                                      <button class="delete_button" id='${item.prodcut}'>Delete</button>
                                    </div>
                                </div>
                                </div>
                                <div class="item_price">
                                 <strong> $${item.price}</strong>
                                </div>
                             </li>                            
                            `).join("")}
                    </ul>
                </div>
                <div class="checkout_container">
                     <div class="title_container"><h1>Checkout</h1></div>
                     <div class="action_info">
                         <div class="total_container">
                         <div>
                            <strong>SubTotal</strong>
                         </div>
                         (${cartItems.reduce((a,c)=> a+c.Qty, 0 )} items)
                         </div>
                         <div class="price_continer">
                          <strong>Price</strong>
                          ($${cartItems.reduce((a,c)=> a + c.price*c.Qty,0)})
                         </div>
                     </div>
                     <div class="button_checkout" id="checkout"><button>Checkout</button></div>
                     
                </div>    
          </div>
        `


    }
        
}

export default CartScreen