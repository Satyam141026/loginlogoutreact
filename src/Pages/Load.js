
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Pagination, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert';
const Load = () => {

  const [student,setStudent] = useState({
    data:[],
    meta:{
      pagination:{
page: '',
pageCount: '',
pageSize:'',
total: ''
      }
    }
  });
  //Empty Array



let loadmore1=(e)=>{
getStudents(student.meta.pagination.page + 1)
 console.log(student.meta.pagination.page +1);
  
}
let getStudents = (pageno=1) =>{// e = event //ES6 Fat arrow functions // default argument
  console.log();
  console.log('good morning')
  //Alway wrap the api calling code inside trycatch block
  try {
      //Call the api
      // Fetch API
      //AXIOS

      //What is the api
      //Fetch API with Promise Chain
      fetch(`http://localhost:1337/api/students?pagination[page]=${pageno}&pagination[pageSize]=10`)
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
                  console.log(data.meta.pagination);
          
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
<h1>Read Operation With Load More</h1>
          <Button onClick={(e)=>{ getStudents() }}>Get My Friends</Button>
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
}{student.meta.pagination.page!==student.meta.pagination.pageCount &&
<Button onClick={(e)=>{loadmore1(e)}} className="justify-center" >Load</Button>
}
    </div>
  )
}
export default Load