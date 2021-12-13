import { getCartItems } from "./localStorage";

export const parseReqeustUrl=()=>{
    const url =document.location.hash.toLowerCase();
   const request =url.split("/")
   return{
       resource:request[1],
       id:request[2],
       
   }
   
}

export const Rerender =async  (component)=>{
    document.getElementById("main-container").innerHTML= await component.render()
    await component.after_render()
}

export const showLoading=()=>{
    const overlay=document.getElementById("loading_overlay");
    overlay.classList.add("active")
}
export const hideLoading =()=>{
    const overlay=document.getElementById("loading_overlay")
    overlay.classList.remove("active")
}

export const showMessage=(message,callback)=>{
    const messageOverlay= document.getElementById("message_overlay")
    messageOverlay.classList.add("active")
    messageOverlay.innerHTML=`
        <div class="overlay_container">
            <div>${message}</div>
            <button class="btn_alert" id="close-overlay-button">OK</button>
        </div>
    `
    document.getElementById("close-overlay-button")
    .addEventListener("click",()=>{
        messageOverlay.classList.remove("active")
    })
    if(callback)
    callback()
}

export const RedirectUser=()=>{
    if(getCartItems().length !==0){
        document.location.hash="/shipping"
    }else{
        document.location.hash="/"
    }
}