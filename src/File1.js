import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config2 = require("./config2.json");
export const File1 = () => {
const [data1,setData]=useState("")
const [pro,setPro]=useState({
percent:0,
load:false


})
const [jwt,setJwt]=useState({
token:''
})
useEffect(()=>{
  
  let user = JSON.parse(localStorage.getItem('user'))
  try {
    setJwt({
      ...jwt,
      token:user.jwt

})
  } catch (error) {
    console.log(error);
  }
},[])
const handleChange=(e)=>{
  console.log("Changed", e[0]);

setData(e[0])
}

let  uploadImage = async(e) => {
  setPro({
    percent:0,
    load:true
  })
  e.preventDefault();

  try {
    let data = new FormData();
  data.append("files", data1);
let upload_response = await axios({ method: "POST",
      url: 'https://ancient-oasis-43602.herokuapp.com/api/upload', headers:{
        'content-type':'application.json',
        "Authorization":`Bearer ${jwt.token}`
      }
      ,data,
      onUploadProgress:(progress)=>{
        console.log(progress);
        setPro( { 
          load:true, 
          percent: Math.round(progress.loaded / progress.total * 100)}
        )
      }
    })
    setPro({
      load:false
    })
    toast("file Uploaded Successfully")
    console.log(upload_response)
  } catch (error) {
    console.log(error);
  }
 
};
/*
let upload_response =  fetch({ method: "POST",
      url: '/api/upload',
      data
    })


*/
  return (
<> <form
    className="mt-5"
    onSubmit={(e) => {
      uploadImage(e);}}
  >
    <div className="mb-3">
      <label htmlFor="file" className="form-label">
        Upload File
      </label>
      <input
        onChange={(e) => {
          handleChange(e.target.files);
        }}
        type="file"
        accept="image/*"
        name="files"
        className="form-control"
        id="file"
      />
    </div>
    <button type="submit">Submit</button>
  </form>
  <ToastContainer/>
  { pro.load &&
  <div className="progress mt-5">
  <div className="progress-bar" role="progressbar" style={{width: pro.percent+'%'}} aria-valuenow={pro.percent} aria-valuemin={0} aria-valuemax={100}>{pro.percent}</div>
</div>
}
  </>
   
  )
}


