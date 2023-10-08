import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Addmovie = (props) => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken"));


  const [post, setPost] = useState(props.data);

  
  console.log("method", props.method);
  console.log("data", props.data);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post, [name]: value
    })
    console.log(post);
  }
  const addMovie = () => {

    if (!post.name || !post.category || !post.languages || !post.cast || !post.ticket_rate || !post.no_seats) {
      alert("Please fill in all the fields.");
      return;
    }



    // Validate ticket_rate and no_seats as numbers
    if (isNaN(post.ticket_rate) || isNaN(post.no_seats)) {
      alert("ticket_rate and no_seats should be numbers.");
      return;
    }


    let data = {

      token: userToken,
      movie_name: post.name,
      img_url: post.img_url,
      category: post.category,
      languages: post.languages,
      cast: post.cast,
      description: post.description,
      ticket_rate: post.ticket_rate,
      no_seats: post.no_seats
    }
    console.log("addmovie clicked", post);
    if (props.method === "post") {

      axios.post("http://localhost:3000/api/postdata", data)
        .then((response) => {
          if (response.data.message === "movie added successfully") {
            alert(response.data.message);
            window.location.reload(true);

          }
          else {
            alert(response.data.message);
          }

        })
        .catch(err => console.log(err))
    }
    if (props.method == "put") {
      axios.put("http://localhost:3000/api/edit/" + post._id, post)
        .then((response) => {
          if (response.data.message === "Updated Successfully") {
            alert(response.data.message);
            window.location.reload(false);
          }
          else {
            alert(response.data.message);
          }

        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div>

      <main className="main-content">
        <div className="container">
          <div className="page">
            <div className="breadcrumbs">
              <a href="/movies">Home</a>
              <span>Add Movies</span>
            </div>

            <div className="content">
              <div className="row">
                <div className="col-md-4">
                  <h2>Add Movies</h2>

                  <div className="contact-form">
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Movie Name</label> <span class="danger" style={{ color: "red" }}>*</span>
                      <input type="text" className="form-control" name="name" value={post.name} onChange={inputHandler} />
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Image URL</label> <span class="danger" style={{ color: "red" }}>*</span>
                      <input type="text" className="form-control" name="image" value={post.image} onChange={inputHandler} />
                    </div>

                    <div className="col-12">
                      <label htmlFor="" className="form-label">Category</label> <span className="danger" style={{ color: "red" }}>*</span>
                    </div>
                    <div className="col-12">
                      <div className="filters">
                        <select name="category" className="" value={post.category} onChange={inputHandler}>
                          <option value="">Select Category</option>
                          <option value="UA">UA</option>
                          <option value="A">A</option>
                          <option value="PG">PG</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label">Languages</label> <span className="danger" style={{ color: "red" }}>*</span>
                    </div>
                    <div className="col-12">
                      <div className="filters">
                        <select name="languages" className="form-control" value={post.languages} onChange={inputHandler}>
                          <option value="">Select Language</option>
                          <option value="Malayalam">Malayalam</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Tamil">Tamil</option>
                          <option value="Telugu">Telugu</option>
                          <option value="English">English</option>
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-12">
                      <label htmlFor="" className="form-label" >Category</label> <span class="danger" style={{ color: "red" }}>*</span>
                      <input type="text" className="form-control" name="category" value={post.category} onChange={inputHandler} />
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Languages</label> <span class="danger" style={{ color: "red" }}>*</span>
                      <textarea name="languages" cols="10" rows="5" className="form-control" placeholder='Type a Languages' value={post.languages} onChange={inputHandler} ></textarea>
                    </div> */}
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Casting</label> <span class="danger" style={{ color: "red" }}>*</span>
                      <input type="text" className="form-control" name="cast" value={post.cast} onChange={inputHandler} />
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Description</label>
                      <textarea name="description" cols="10" rows="5" className="form-control" placeholder='Type ...' value={post.description} onChange={inputHandler} ></textarea>
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Ticket Rate</label> <span class="danger" style={{ color: "red" }}>*</span>
                      <input type="number" className="form-control" name="ticket_rate" value={post.ticket_rate} onChange={inputHandler} />

                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >No of Seats</label> <span class="danger" style={{ color: "red" }}>*</span>
                      <input type="number" className="form-control" name="no_seats" value={post.no_seats} onChange={inputHandler} />
                    </div>

                    <div className="col-12">
                      <label htmlFor="" className="form-label">Show Time</label> <span className="danger" style={{ color: "red" }}>*</span>
                      <input
                        type="text"
                        className="form-control"
                        name="show_time"
                        value={post.show_time}
                        onChange={inputHandler}
                        placeholder="HH:MI"
                      />
                    </div>

                    <div className="col-12">
                      <button className="button" onClick={addMovie}>Add Movie</button>
                    </div>
                    <br />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <div className="container">
        <section className="section min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <br/>
                <div className="d-flex justify-content-center">
                  <h1>Add Movies</h1>
                </div>
                 <br/>
                <div className="card">
                  <div className="card-body">
                    <br/>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Movie Name</label> <span class="danger" style={{color:"red"}}>*</span>
                      <input type="text" className="form-control" name="name" value={post.name} onChange={inputHandler}/>
                      
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Image URL</label> <span class="danger" style={{color:"red"}}>*</span>
                      <input type="text" className="form-control" name="image" value={post.image} onChange={inputHandler}/>
                      
                    </div>
                   
                    <div className="col-12">
                        <label htmlFor="" className="form-label" >Category</label> <span class="danger" style={{color:"red"}}>*</span>
                        <input type="text" className="form-control" name="category" value={post.category} onChange={inputHandler}/>
                       
                    </div> 
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Languages</label> <span class="danger" style={{color:"red"}}>*</span>
                      <textarea name="languages" cols="10" rows="5" className="form-control" placeholder='Type a Languages' value={post.languages} onChange={inputHandler} ></textarea>
                      
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >cast</label> <span class="danger" style={{color:"red"}}>*</span>
                      <input type="text" className="form-control" name="cast" value={post.cast} onChange={inputHandler}/>
                    
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Description</label> 
                      <textarea name="description" cols="10" rows="5" className="form-control" placeholder='Type ...' value={post.description} onChange={inputHandler} ></textarea>
                      
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >Ticket Rate</label> <span class="danger" style={{color:"red"}}>*</span>
                      <input type="number" className="form-control" name="ticket_rate" value={post.ticket_rate} onChange={inputHandler}/>
                    
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="form-label" >No of Seats</label> <span class="danger" style={{color:"red"}}>*</span>
                      <input type="number" className="form-control" name="no_seats" value={post.no_seats} onChange={inputHandler}/>
                    
                    </div>
                    <br />
                    <div className="col-12">
                        <button className="btn btn-success" onClick={addMovie}>Add Movie</button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </div>
  )
}

export default Addmovie