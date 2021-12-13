

export const getCartItems=()=>{
    const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems
}

export const setCartItem=(cartItems)=>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
}
export const SetUserInfo=({
    id='',
    name='',
    email='',
    password='',
    token='',
    isAdmin=false,

})=>{
    localStorage.setItem("userInfo",JSON.stringify({
        id,name,email,password,token,isAdmin
    }))
}

export const GetUserInfo=()=>localStorage.getItem("userInfo")?
    JSON.parse(localStorage.getItem("userInfo"))
    :{name:'',email:'',password:''}

 export const clearUser=()=>{
    localStorage.removeItem("userInfo")
}

export const setshippinguser=({address="",city="",postalcode="",country=""})=>{
    localStorage.setItem("shippingInfo",JSON.stringify({address,city,postalcode,country}))

}

export const getshippingUser=()=>{
    const shipping= localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo"))
    :{address:'',city:'',postalcode:'',country:''}
    return shipping
}

export const setpayment=({paymentMethod=""})=>{
 localStorage.setItem("paymentmethod",JSON.stringify({paymentMethod}))
}

export const getpayment=()=>{
    const paymentway =localStorage.getItem("paymentmethod")
    ?JSON.parse(localStorage.getItem("paymentmethod"))
    :{paymentMethod:"PAYPAL"} 
    return paymentway
}

export const cleancart=()=>{
      localStorage.removeItem("cartItems")
}