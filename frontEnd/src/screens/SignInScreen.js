import { signin } from "../api";
import { GetUserInfo, SetUserInfo } from "../localStorage";
import { hideLoading, RedirectUser, showLoading, showMessage } from "../utile";

const SignInScreen ={
    after_render: ()=> {
        document.getElementById("singin-form")
        .addEventListener("submit", async(e)=>{
            e.preventDefault();
            const email=document.querySelector("#email").value;
            const password=document.querySelector("#password").value;
            showLoading()
            const data =await signin({email,password});
            hideLoading()
                 if(data.error){
                    showMessage(data.error)
                }else{
                    SetUserInfo(data)
                    RedirectUser()
                }
        })
    },
    render:()=>{
          if(GetUserInfo().name){
            RedirectUser()
          }
          
          return `
           
                <div class="form-container container">
                    <form id="singin-form" >
                        <ul class="form-items">
                          <li>
                            <h1>SignIn</h1>
                          </li>
                          <li>
                             <label for="email">email</label>
                             <input type="email" id="email" name="email" />      
                          </li>
                          <li>
                             <label for="password">password</label>
                             <input type="password" id="password" name="password" />      
                          </li>
                          <li>
                             <button type="submit">SignIn</button>
                          </li>
                          <li>
                              <div>
                                 New User?
                                 <a href="/#/register">create your account</a>
                              </div>
                          </li>
                        </ul>
                    </form>
                </div>
           
            `
        }
        
}

export default SignInScreen