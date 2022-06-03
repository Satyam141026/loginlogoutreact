import axios from 'axios';
import React, { useState } from 'react'


const Practicalupload = () => {
const [up,setUp]=useState("")

const handleChange=(e)=>{

console.log("changed",e[0]);
setUp(e[0])
}
const handleUpload= async(e)=>{
 e.preventDefault();
 const data=new FormData()
 data.append("files",up)
 let upload_response = await axios({ method: "POST",
 url: 'https://ancient-oasis-43602.herokuapp.com/api/upload', headers:{
   'content-type':'application.json',

 }


 ,data})
 /*
 let upload_response =  fetch({ method: "POST",
 url: 'https://ancient-oasis-43602.herokuapp.com/api/upload', headers:{
  'content-type':'application.json',

}
,
body:JSON.stringify(data)
})*/
}
  return (
 
<form onSubmit={(e)=>{handleUpload(e)}}>
    <input type='file' onChange={(e)=>{ handleChange(e.target.files)  }} name='uploadfile'/>
    <button type="submit">Submit</button>
    </form>




  )
}

export default Practicalupload