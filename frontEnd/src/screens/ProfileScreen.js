import { update } from "../api";
import { clearUser, GetUserInfo, SetUserInfo } from "../localStorage";
import {  showMessage } from "../utile";

const ProfileScreen ={
    after_render: ()=> {
        document.getElementById("sign-out").addEventListener("click",()=>{
            clearUser();
            document.location.hash="/"
        })
        /* submit */
        document.getElementById("profile-form")
        .addEventListener("submit", async(e)=>{
            e.preventDefault();
            const email=document.querySelector("#email").value;
            const password=document.querySelector("#password").value;
            const name=document.querySelector("#name").value;
            const data =await update({name,email,password});
                 if(data.error){
                    showMessage(data.error)
                }else{
                    SetUserInfo(data)
                    document.location.hash="/"
                }
        })
    },
    render:()=>{
         
          const {name,email} =GetUserInfo()
          if(!name){
              document.location.hash="/"
          }
          return `
           
                <div class="form-container container">
                    <form id="profile-form" >
                        <ul class="form-items">
                          <li>
                            <h1>Profile</h1>
                          </li>
                          <li>
                          <label for="email">name</label>
                          <input type="text" id="name" name="name" value="${name}" />      
                       </li>
                          <li>
                             <label for="email">email</label>
                             <input type="email" id="email" name="email" value="${email}" />      
                          </li>
                          <li>
                             <label for="password">password</label>
                             <input type="password" id="password" name="password" />      
                          </li>
                          <li>
                             <button type="submit">Update</button>
                          </li>
                          <li>
                            <button type="button" id="sign-out">sign out</button>
                          </li>
                        </ul>
                    </form>
                </div>
           
            `
        }
        
}

export default ProfileScreen