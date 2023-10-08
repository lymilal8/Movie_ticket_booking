import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Addemployee = (props) => {
    const navigate=useNavigate();
    const[userToken,setUserToken] =useState(sessionStorage.getItem("userToken"));


  const[post,setPost] = useState(props.data);
  console.log("method",props.method);
  console.log("data",props.data);
  const inputHandler=(e)=>{
    const {name,value} = e.target;
    setPost({
      ...post,[name]:value
    })
    console.log(post);
  }
  const addPost=()=>{

    if (!post.name || !post.address || !post.phone || !post.email || !post.post || !post.salary) {
      alert("Please fill in all the fields.");
      return;
    }

     // Validate email format
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(post.email)) {
       alert("Please enter a valid email address.");
       return;
     }
 
     // Validate salary and phone number as numbers
     if (isNaN(post.salary) || isNaN(post.phone)) {
       alert("Salary and phone number should be numbers.");
       return;
     }
 
     // Validate phone number length
     if (post.phone.length !== 10) {
       alert("Phone number should be 10 digits.");
       return;
     }
    let data={
   
        token:userToken,
        name:post.name,
        address:post.address,
        phone:post.phone,
        email:post.email,
        post:post.post,
        salary:post.salary,
    }
    console.log("addemployee clicked",post);
    if(props.method==="post")
    {

        axios.post("http://localhost:3000/api/postdata",data)
        .then((response)=>{
          if(response.data.message==="employee added successfully")
          {
            alert(response.data.message);
            navigate('/viewemployee')
          }
          else
          {
            alert(response.data.message);
          }

        })
        .catch(err=>console.log(err))
    }
    if(props.method=="put")
    {
      axios.put("http://localhost:3000/api/edit/"+post._id,post)
        .then((response)=>{
          if(response.data.message==="Updated Successfully")
          {
            alert(response.data.message);
            window.location.reload(false);
          }
          else
          {
            alert(response.data.message);
          }

        })
        .catch(err=>console.log(err))
    }
}

  return (
    <div>

<div className="container">
        <section className="section min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <br/>
                <div className="d-flex justify-content-center">
                  <h1>Employee Registration</h1>
                </div>
                 <br/>
                <div className="card">
                  <div className="card-body">
                    <br/>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Name</label> <span class="danger" style={{color:"red"}}>*</span>
                      <input type="text" className="form-control" name="name" value={post.name} onChange={inputHandler}/>
                      
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Address</label> <span class="danger" style={{color:"red"}}>*</span>
                      <textarea name="address" cols="10" rows="5" className="form-control" placeholder='Type a Address' value={post.address} onChange={inputHandler} ></textarea>
                      
                    </div>
                    <div className="col-12">
                        <label htmlFor="" className="form-label" >Phone Number</label> <span class="danger" style={{color:"red"}}>*</span>
                        <input type="number" className="form-control" name="phone" value={post.phone} onChange={inputHandler}/>
                       
                    </div> 
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Email</label> <span class="danger" style={{color:"red"}}>*</span>
                      <input type="text" className="form-control" name="email" value={post.email} onChange={inputHandler}/>
                      
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Designation</label> <span class="danger" style={{color:"red"}}>*</span>
                      <input type="text" className="form-control" name="post" value={post.post} onChange={inputHandler}/>
                    
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Salary</label> <span class="danger" style={{color:"red"}}>*</span>
                      <input type="number" className="form-control" name="salary" value={post.salary} onChange={inputHandler}/>
                    
                    </div>
                    <br />
                    <div className="col-12">
                        <button className="btn btn-success" onClick={addPost}>Add Employee</button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

export default Addemployee