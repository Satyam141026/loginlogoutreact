import axios from 'axios';
import React, { useState } from 'react'

import Practicalupload from './Practicalupload';
const PracticalLogin = () => {
    const [data1,setData]=useState({
        identifier:'',
        password:''
    })
    const [log1,setLog1]=useState({
    isLogged:false
  })

const handleChange=(e)=>{
//console.log("hello");

if(e.target.classList.contains('em')){
    console.log(e.target.classList.contains('em'));
    setData({
        ...data1,
        identifier:e.target.value
    })
console.log(data1.identifier);
}
if(e.target.classList.contains('psd')){
    console.log(e.target.classList.contains('psd'));
    setData({
        ...data1,
        password:e.target.value
    })
    console.log(data1.password);
    }
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()
   
       
            
try {
  const {data}=await axios.post('http://localhost:1337/api/auth/local',{
    identifier:data1.identifier,
    password:data1.password
 
    
    },{    headers:{
      'Content-Type': 'application/json'
    }})
    setLog1({
      isLogged:true
    })
    localStorage.setItem("user",JSON.stringify( data))
} catch (error) {
  console.log(error);
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
      { log1.isLogged||
    <form onSubmit={(e)=>handleSubmit(e)}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1"  className="form-label">Email address</label>
    <input type="email" onChange={(e)=>{handleChange(e)}} className="form-control em" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label ">Password</label>
    <input type="password" onChange={(e)=>{handleChange(e)}} className="form-control psd" id="exampleInputPassword1" />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
}
<button onClick={(e)=>{logOut1(e)}} className='btn btn-syccess text-center' >Logout</button>
    </div>
 
  
  </div>

{  log1.isLogged &&
<Practicalupload/>

}





</div>
  )
}

export default PracticalLogin
