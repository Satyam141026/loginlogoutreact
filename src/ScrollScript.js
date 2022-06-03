
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Pagination, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert';


const ScrollScript = () => {

  const [student,setStudent] = useState({
    data:[],
    meta:{
      pagination:{
page: 1,
pageCount: '',
pageSize:'',
total: ''
      }
    }
  });
  //Empty Array
useEffect((e)=>{

const checkScrool=(e)=>{
   //console.log('Hello');
            //console.log(inputElement);
            //console.log(document.documentElement.clientHeight);
            //console.log(window.innerHeight);
            //console.log(window.pageYOffset);
           // console.log(window.pageYOffset);
          //  console.log(window.innerHeight);
            //console.log(window);
         //   console.log(window.scrollTo);
      //   console.log(window.scrollY);
            //setOffset(window.pageYOffset);
            console.log('Scroll Y ',window.scrollY);    
            //window.pageYOffset == window.scrollY
            //console.log(window.pageYOffset);
  console.log("windows",window); 
 //   console.log("e",window); 
 if(window.scrollY>38){
  
    //console.log((student.meta.pagination.page+1));
    let i=student.meta.pagination.page+1
    console.log("i value",i);
    getStudents(parseInt(student.meta.pagination.page) + 1)
    console.log('reached Bottom'); 
    console.log((parseInt(student.meta.pagination.page) + 1))


 }
}

getStudents(1)

window.addEventListener("scroll",checkScrool)

},[])




let getStudents = (pageno=1) =>{// e = event //ES6 Fat arrow functions // default argument

  //Alway wrap the api calling code inside trycatch block
  try {
      //Call the api
      // Fetch API
      //AXIOS

      //What is the api
      //Fetch API with Promise Chain
      fetch(`http://localhost:1337/api/student-frinds?pagination[page]=${pageno}&pagination[pageSize]=15`)
      .then((data)=>{
          //let make data json readable
          return data.json();
      }).then((data)=>{
          //console.log('current Value of student is 1',student);
          setStudent({
                      ...student,
                      data:student.data.concat(data.data),
                      meta:data.meta
                  });
          
          
      }).catch((err)=>{
          console.log(err);
      });

      //console.log('current Value of student is 3',student);
  } catch (error) {
      console.log(error)
  }
}
 
const handleDelete= async(e)=>{
        const id1=e.target.closest('tr').querySelector('td:first-child').innerHTML
     
        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then( async (willDelete) => {
        if (willDelete) {

        try {
        if(id1){
        let po=await axios.delete('http://localhost:1337/api/student-frinds/'+id1);
        }
        
        } catch (error) {
        
        }
        } else {
        //swal("Your imaginary file is safe!");
        }
        });


  }

  return (
    <div className='Container' style={{textAlign:'center'}}>

{student.data.length> 0 &&
<>
<Table striped bordered hover variant="dark">
<thead>
  <tr>
    <th>#</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>'             Action'</th>
  </tr>
</thead>
<tbody>
{

                student.data.map(function(currentValue, index, arr){
     
                  return (
                        <tr key={index}>
                          <td>{arr[index].id}</td>
                          <td>{arr[index].attributes.Name}</td>
                          <td>{arr[index].attributes.createdAt}</td>
                          <td>
                                <Button variant="success" size="sm">View</Button>&nbsp;
                                <Button variant="primary" size="sm">Edit</Button>&nbsp;
                                <Button variant="danger" onClick={(e)=>handleDelete(e)}  size="sm">Delete</Button>

                        </td>
                        </tr>
                  )//JSX
                })
              }
</tbody>
</Table>

</>
}
    </div>
  )
}
export default ScrollScript;