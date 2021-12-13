import { register } from "../api";
import {  showMessage } from "../utile";

const RegisterScreen ={
    after_render: ()=> {
        document.getElementById("register-form")
        .addEventListener("submit", async(e)=>{
            e.preventDefault();

            const email=document.querySelector("#email").value;
            const password=document.querySelector("#password").value;
            const name=document.querySelector("#name").value;

            const data =await register({name,email,password});
                 if(data.error){
                    showMessage(data.error)
                }else{
                    document.location.hash="/signin"
                }
        })
    },
    render:()=>`
           
                <div class="form-container container">
                    <form id="register-form"  autocomplete="off">
                        <ul class="form-items">
                          <li>
                            <h1>SignIn</h1>
                          </li>
                          <li>
                          <label for="name">name</label>
                          <input type="text" id="name" name="name" />      
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
                                 already singin?
                                 <a href="/#/signin">log in to your account</a>
                              </div>
                          </li>
                        </ul>
                    </form>
                </div>
           
            `
        
}

export default RegisterScreen