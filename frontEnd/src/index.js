import Erour404screen from './screens/Erour404screen';
import homescreen from './screens/homescreen';
import productscreen from './screens/productscreen';
import { hideLoading, parseReqeustUrl, showLoading } from './utile';
// eslint-disable-next-line no-unused-vars
import style from './main.css';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import Header from './component/Header';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const Routes = {
  '/': homescreen,
  '/product/:id': productscreen,
  '/cart/:id':CartScreen,
  '/cart':CartScreen,
  '/signin':SignInScreen,
  '/register':RegisterScreen,
  '/profile':ProfileScreen,
  '/shipping':ShippingScreen,
  '/payment':PaymentScreen,
  '/placeorder':PlaceOrderScreen,
  '/order/:id':OrderScreen
};
showLoading()
const router = async () => {
  const request = parseReqeustUrl();
  const parsurl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '');
  const screen = Routes[parsurl] ? Routes[parsurl] : Erour404screen;
  
  const header=document.getElementById("header-conatianer")
         header.innerHTML=await Header.render()
        if(Header.after_render)
        await Header.after_render()

  const main = document.getElementById('main-container');
  if(screen.render())
  main.innerHTML = await screen.render();
  hideLoading()
  if(screen.after_render)
  screen.after_render();

};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
