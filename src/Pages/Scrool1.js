
import { Button, Form, Pagination, Spinner, Table } from 'react-bootstrap';
import React, { useEffect, useState  } from 'react';
import swal from 'sweetalert';


const axios = require('axios');



// Functional COmpoent

function Scrool1() {
    //1. State/ Hook Variables

    const [student,setStudent] = useState({
                                            data:[],
                                            meta:{
                                                pagination:{
                                                  page:1,
                                                  pageCount: '',
                                                  pageSize: '',
                                                  total: ''
                                                }
                                              } //JS Object
                                          });//Empty Array  
    const [offset, setOffset] = useState(0);
    const [reachedBottom,setReachedBottom] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    //const inputElement = useRef();                                         
    
    useEffect(() => {
        getStudents(1);
        const onScroll = () => {
            //console.log('Hello');
            //console.log(inputElement);
            //console.log(document.documentElement.clientHeight);
            //console.log(window.innerHeight);
            //console.log(window.pageYOffset);
         // console.log(window.pageYOffset);
            console.log(window.innerHeight);
            //console.log(window);
            //console.log(window.scrollTop);

            //setOffset(window.pageYOffset);
            
            //window.pageYOffset == window.scrollY
            //console.log(window.pageYOffset);
           // console.log(0.15*window.innerHeight);

            if(window.pageYOffset > (0.15 * window.innerHeight) /* && window.pageYOffset < (0.20 * window.innerHeight) */){
               
                setReachedBottom(true);
                console.log("Bottom Reached");
                //console.log(student.meta.pagination.page);
          
           
                if(reachedBottom === true && (student.meta.pagination.page !== student.meta.pagination.pageCount)){
                    setIsLoading(true);
                    getStudents(parseInt(student.meta.pagination.page) + 1);
                    setIsLoading(false);
                //    console.log("student",parseInt(student.meta.pagination.page));
           
        



               console.log("student",parseInt(student.meta.pagination.page));









                }
                
                

     
            }
            
        };
        // clean up code
       // window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll);
        
    }, [reachedBottom,isLoading]);
    //console.log(offset);
    
    //2. Functions defination
    let handleDelete = (e)=>{
        var tr = e.target.closest('tr');
        //function chaining
        //console.log(e.target.closest('tr').remove());  

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then( async (willDelete) => {
            if (willDelete) {
                console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML); //e is a event object
                var delid = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
               // console.log(delid);
                //API Call
                try {
                    let po = await axios.delete(`http://localhost:1337/api/student-frinds/${delid}`); 
                    if(po.status === 200){
                        tr.remove();
                        swal("Good job!", "Record Deleted Successfully", "success");
                    }
                } catch (error) {
                        console.log(error)
                }
            } else {
                //swal("Your imaginary file is safe!");
            }
        });
    }

    let getStudents = (pageno=1) =>{// e = event //ES6 Fat arrow functions // default argument
        //console.log();
       // console.log('good morning')
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
               // console.log(student.data)
                setStudent({
                            ...student,
                            data:student.data.concat(data.data),
                            meta:data.meta,
                        
                        });
                
                
            }).catch((err)=>{
                //console.log(err);
            });

            //console.log('current Value of student is 3',student);
        } catch (error) {
            //console.log(error)
        }
    }
    //3. Return statement JSX
    return (
            <div>
                <div className="text-center">
                    <h1>Read Operation Using Infinite Scoll<br /></h1>
                </div>
                
                <br />
                <br />
                {
                    student.data.length > 0 &&
                    <React.Fragment>
                    
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Friend Name</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    student.data.map(function(currentValue, index, arr){
                                        //console.log('currentValue',currentValue)
                                    //console.log(arr[index].id);
                                    //console.log(arr[index].attributes.name);
                                        return (
                                            <tr key={index}>
                                                <td>{currentValue.id}</td>
                                                <td>{currentValue.attributes.name}</td>
                                                <td>
                                                    <Button variant="success" size="sm">View</Button>&nbsp;
                                                    <Button variant="primary" size="sm">Edit</Button>&nbsp;
                                                    <Button variant="danger" onClick={(e)=>{ handleDelete(e) }} size="sm">Delete</Button>
                                                </td>
                                            </tr>
                                        )//JSX
                                    })
                                }
                            </tbody>
                        </Table>
                        {
                            isLoading &&
                            <div className="d-flex justify-content-center">
                                <Spinner animation="grow" variant="success" />
                            </div>
                        }
                        
                        
                    </React.Fragment>
                }
                
            </div>
    );
}

export default Scrool1;