import { GetProduct } from '../api';
import rating from '../component/rating';
import { hideLoading, parseReqeustUrl, showLoading } from '../utile';

const productscreen = {
  after_render:()=>{
      document.getElementById("add_button").addEventListener("click",
      ()=>{
        const request=parseReqeustUrl()
        console.log("chicks")
        document.location.hash=`/cart/${request.id}`
      })
  },
  render: async () => {
    showLoading();
    const request = parseReqeustUrl();
     const product = await GetProduct(request.id)
     hideLoading();
    if(product.error){
      return `<div class="container">${product.error}</div>`
    }
    
    return `
    <div class="product_screen_wrapper container">
          <div class="product_wrapper"><img src='${product.image}' alt='${product.name}'/></div>
          <div class="product-detailes">
              <div class="product-title">${product.name}</div>
              <div>${rating.render({value:product.rating,text:`${product.numReviews} reviews`})}</div>
              <div class="item-brand">${product.brand}</div>
              <div class="item-price">$${product.price}</div>
          </div>
          <div class="shopping_card">
               <div class="price">
                  <span>total price</span>
                  <span>$${product.price}</span>
               </div>
               <div class="instock">
                  <span>InStock:</span>
                  <span>${product.countInStock}</span>
               </div>
               <button id="add_button" class="add_to_card"><a >Add To Card</a></button>
          </div>
      </div>`;
    
    
   
  }
};

export default productscreen;
