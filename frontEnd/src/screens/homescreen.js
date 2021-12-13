import axios from 'axios';
import rating from '../component/rating';
import { hideLoading, showLoading } from '../utile';

const hommescreen = {
  
  render: async () => {
    showLoading()
    const response = await axios({
      url: 'http://127.0.0.1:5000/api/product',
      headers: {
        'content-Type': 'application/json'
      }
    });
    hideLoading()
    if (!response || response.statusText !== 'OK') {
      return '<div>there is no data</div>';
    }
    const products = response.data;
    return `
        <div class="hero_section">
        <div class="text_hero">
            <p class="title">NEW ARRIVELS</p>
            <P class="text">Discover new clothes with modern style desinged by passion and patience</P>
            <button>Shop Now</button>
        </div>
    </div>
    <div class="categories container">
        <h1>CATEGORIES</h1>
         <div class="categoreis_wrapper">
            <a href="/#/men"><div class="category men">MEN</div></a>
            <a href="/#/women"><div class="category women">WOMEN</div></a>
       </div>
    </div>
    <div class="product_view container">
    <h2>NEWEST PRODUCTS</h2>
        <ul class="products">
         ${products.map((product) => `
         <li>
         <div class="product">
             <a href="/#/product/${product.id}">
              <img src='${product.image}' alt='${product.name}'>
             </a>
             <div class="product-name">
                 <a href="/#/product/${product.id}">
                  ${product.name}
                 </a>
             </div>
             <div>${rating.render({value:product.rating,text:`${product.numReviews} reviews` })}<div>
             <div class="product-brand">
                 ${product.brand}
             </div>
             <div class="product-price">
                 $${product.price}
             </div>
         </div>
     </li>
         
         `).join('\n')}
        </ul>
        </div>
        `;
  }
};

export default hommescreen;
