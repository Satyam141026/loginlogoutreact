import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { File1 } from '../File1'
const config2=require('../config2.json')
export const Login = () => {
    const [data2,setData2]=useState({

'identifier':''
,'password':''
        
    })
    const [user,setUser]=useState({
        is_loggedin:false,
        user:null
    })
useEffect(()=>{
try {
 let user=   JSON.parse(localStorage.getItem("user")) 
 if(user){
//loggedin
setUser({
    ...user,
    is_loggedin:true
})
 }
 else{
//not logged
setUser({
    ...user,
    is_loggedin:false
})
 }
} catch (error) {
    
}
},[])
const log1=async (e)=>{

e.preventDefault()
try {
  //  const {data}=await axios.post('https://ancient-oasis-43602.herokuapp.com/api/auth/local',{
      const {data}=await axios.post(`${config2.prod_api_url}/api/auth/local`,{
identifier:data2.identifier,
password:data2.password



},{    headers:{
  'Content-Type': 'application/json'
}})

console.log(data);
setUser(
    {
...user,
        is_loggedin:true
    }
)
localStorage.setItem("user",JSON.stringify( data))
} catch (error) {
    console.log(error);
}

}
const handleChange=(e)=>{

if(e.target.classList.contains('a_username')){

setData2({
    ...data2,
    identifier:e.target.value
})

}
if(e.target.classList.contains('a_password')){
    setData2({
        ...data2,
        password:e.target.value

    })

}

}
const logOut1=(e)=>{
localStorage.removeItem('user')//remove perticular key
//localStorage.clear()///remove all the key
  window.location.replace('/')
  }
  
  return (
<div className="container">

  <div className="row">
    <div className="col">
      {user.is_loggedin ||
      <>
         <h1>Login Form</h1>
    <form onSubmit={(e)=>{log1(e)}}>  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email"  onChange={(e)=>handleChange(e)} name="identifier" className="form-control a_username" id="exampleInputEmail1"  aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text ">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1"   className="form-label">Password</label>
    <input type="password"  name="password" onChange={(e)=>handleChange(e)} className="form-control a_password" id="exampleInputPassword1" />
  </div>                    
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </> 
      }
     
    </div>
    
  </div>
  { user.is_loggedin && 
  <>
  <button onClick={(e)=>{logOut1(e)}} className='btn btn-syccess text-center' >Logout</button>
<File1/>

</>

  }

</div>


  )
}
