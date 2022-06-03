import axios from 'axios'
import React, { useState } from 'react'
import { Pagination, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert';
const config = require('./config.json')
export const ReadFetch = () => {
  
  const [student,setStudent] = useState({
    data:[]
  });
  //Empty Array
const [pageniation,setPagination]=useState([])
let goToPage=(e)=>{
  var pageno = parseInt(e.target.innerHTML);
  showData(pageno);
}
  let showData=(pageno=1)=>{// e = event //ES6 Fat arrow functions // default argument

   

                          try {
                          
                          console.log(pageno);
                          
                /*    axios.get(`http://localhost:1337/api/students?pagination[page]=${pageno}&pagination[pageSize]=10`).then((data)=>{
                
                      setStudent(data.data);
                      console.log(data.data);
                      }).catch((e)=>{console.log(e)})
                     
               */   // fetch('http://localhost:1337/api/students')
               fetch(`http://localhost:1337/api/students?pagination[page]=${pageno}&pagination[pageSize]=6`)
                                    .then((data)=>{
                                      //let make data json readable
                                      return data.json();
                                    }).then((data)=>{
                                      console.log(data);
                                      setStudent(data);
                                  
          var start = data.meta.pagination.page
          var arr = []; //empty array;
for(let i=1;i <= data.meta.pagination.pageCount; i++){
  if(i===start){
    arr.push( <Pagination.Item active onClick={(e)=>{goToPage(e)}}>{i}</Pagination.Item> )
  }
  else{
    arr.push( <Pagination.Item  onClick={(e)=>{goToPage(e)}}>{i}</Pagination.Item> )
  }


}
setPagination(arr)


                                    }).catch((err)=>{
                                      console.log(err);
                                    });             
                                                              } 


                          catch (error) {
                                console.log(error)
                              } 
  }
  
  let first = (e)=>{
   
    
    if(student.meta.pagination.page !== 1){
      showData(1); // Actual Arguemtn
    }
  }

  let last = (e)=>{
   

    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      showData(student.meta.pagination.pageCount);
    }

  }

  let prev = (e)=>{
  
    if(student.meta.pagination.page !== 1){
      showData(student.meta.pagination.page - 1 );
    }
    

  }

  let next = (e)=>{
  
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      showData(student.meta.pagination.page + 1);
    }
    

  }
  const handleDelete= async(e)=>{
const id1=e.target.closest('tr').querySelector('td:first-child').innerHTML
console.log(id1);
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
  let po=await axios.delete('http://localhost:1337/api/students/'+id1);
  }
  
} catch (error) {
  
}
} else {
  //swal("Your imaginary file is safe!");
}
});


  }

  return (
    <div>

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
              //   console.log(student.data);
                //console.log(arr);
            //     console.log(arr[index].id);
              //   console.log(arr[index].attributes.name);
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
<Pagination className='justify-content-center'>
  <Pagination.First onClick={(e)=>first(e)} />
  <Pagination.Prev onClick={(e)=>prev(e)} />
 

  {
              
              pageniation.map(function(currentValue, index, arr){
                return <div key={index}>{currentValue}</div>//JSX
                  
              })
            }
            
  <Pagination.Next  onClick={(e)=>next(e)} />
  <Pagination.Last  onClick={(e)=>last(e)} />
</Pagination>
</>
}
<Button variant="primary" onClick={(e)=>{showData()}}>Primary</Button>





    </div>
  )
}
