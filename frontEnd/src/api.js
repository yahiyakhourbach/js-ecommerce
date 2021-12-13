import axios from "axios"
import { apiurl } from "./config"
import { GetUserInfo } from "./localStorage"


export const GetProduct = async (id) => {
  try{
    const responce=await axios({
        url:`${apiurl}/api/product/${id}`,
        method:"GET",
        headers:{"Content-Type":"application/json"}
    })
    if(responce.statusText !=="OK"){
        throw new Error(responce.data.message)
    }
    return responce.data
  }catch(err){ 
        console.log(err)
        return {error:err.response.data.message }
  }

}

export const signin=async ({email,password}) => {
  try{
  const responce = await axios({
    url:`${apiurl}/api/users/signin`,
    method:"POST",
    header:{
      "Content-Type":"application/json"
    },
    data:{email,password}
  })

   if(responce.statusText !=="OK"){
    throw new Error(responce.data.message) 
   }

    return responce.data

  }catch(err){
   console.log(err)
   return {error:err.response.data.message||err.message}
  }
}


export const register=async ({name,email,password}) => {
  try{
  const responce = await axios({
    url:`${apiurl}/api/users/register`,
    method:"POST",
    header:{
      "Content-Type":"application/json"
    },
    data:{name,email,password}
  })

   if(responce.statusText !=="OK"){
    throw new Error(responce.data.message) 
   }

    return responce.data

  }catch(err){
   console.log(err)
   return {error:err.response.data.message||err.message}
  }
}

export const update=async({name,email,password})=>{
  try{
    const {id,token} =GetUserInfo()
    const responce=await axios({
      url:`${apiurl}/api/users/${id}`,
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`,
      },
      data:{name,email,password}
    })
    if(responce.statusText!=="OK"){
      throw new Error(responce.data.message)
    }
    return responce.data
  }catch(err){
      console.log(err)
      return {error:err.response.data.message ||err.message}
  }

}

export const PlaceOrder= async(order)=>{
  try{
    const {token}=GetUserInfo();
    const response =await axios({
      url:`${apiurl}/api/orders`,
      headers:{
        "Conetent-Type":"application/json",
        Authorization:`Bearer ${token}`,
      },
      method:"POST",
      data:order,
    })
    if(response.statusText!=="Created"){
      throw new Error(response.data.message)
    }
    return response.data
  }catch(err){
    console.log(err)
    return {error:err.response.data.message?err.response.data.message:err.message}
  }
}

export const GetOrder=async(id)=>{
  try{
    const{token}=GetUserInfo()

   
    const response = await axios({
      url:`${apiurl}/api/orders/${id}`,
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      method:"GET"
    })
    if(response.statusText!=="OK"){
      throw new Error(response.data.message)
    }
    return response.data
  }catch(err){
    console.log(err)
    return {error:err.response.data.message?err.response.data.message:err.message}
  }
}


export const getPaypalClientId= async()=>{
try{
  const response =await axios({
    url:`${apiurl}/api/paypal/clientid`,
    header:{
      "Content-Type":"application/json",
    },
    method:"GET",
  })
  if(response.statusText!=="OK"){
    throw new Error(response.data.message)  
  }
  return response.data.clientId

}catch(err){
  return{error:err.data.message?err.data.message:err.message}
}
}

export const payOrder= async(orderid,paymentResult)=>{
 try{
  const {token}=GetUserInfo()
  const response =await axios({
    url:`${apiurl}/api/orders/${orderid}/payment`,
    headers:{
      "Content-Type":"application/json",
      method:"GET",
      Authorization:`Bearer ${token}`
    },
    data:paymentResult
  })
  console.log(response)
  if(response.statusText !=="ok"){
    throw new Error(response.data.message)
  }
  return response.data
 }catch(err){
   return{error:err.response.data.message?err.response.data.message:err.message}
 }
}