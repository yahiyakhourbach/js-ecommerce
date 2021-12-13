import { GetUserInfo } from "../localStorage"

const Header={
    render:async ()=>{
    const {name}=GetUserInfo();
    
  return  `
        <div class="logo_wrapper">
        <a href="/#/">Clothea</a>
    </div>
    <div class="links">
        <div class="link">
            <a href="/#/clothes">Clothes</a>
            <a href="/#/men">Men</a>
            <a href="/#/women">Women</a>
            
       </div>
       <div class="card_wrapper">
           ${name?`<a href="/#/profile">${name}</a>`:`<a href="/#/signin">SignIn</a>`}
           <a href="/#/cart"><i class='bx bx-shopping-bag'></i></a>
       </div>
    </div>
        `
    },
    after_render: async()=>{}
}

export default Header