import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Addmovie from './Addmovie';
import { Link } from 'react-router-dom';

const ViewallMovies = () => {
  const [userStatus, setUserStatus] = useState(sessionStorage.getItem("userStatus"));
  const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken"));
  // const[userID,setUserToken] =useState(sessionStorage.getItem("userToken"));
  console.log(userStatus);

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [singleValue, setSingleValue] = useState([]);

  const fetchDataFromApi = () => {
    axios
      .get(

        "http://localhost:3000/api/getdata/" + userToken
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);

      })
  }
  const deleteBlog = (id) => {
    console.log("delete clicked");
    console.log(id);
    axios.delete("http://localhost:3000/api/delete/" + id)
      .then((response) => {
        alert(response.data.message);
        window.location.reload(false);
      })

  }
  const updateBlog = (val) => {
    console.log("update clicked", val);
    setUpdate(true);
    setSingleValue(val);


  }

  useEffect(() => {
    fetchDataFromApi()
  }, []);

  return (
    <div>
      <div className="container">
        <div className="page">
          <div className="breadcrumbs">
            <a href="/movies">Home</a>
            <span>Movies</span>
          </div>

          <div className="movie-list">
            {data.map((value, index) => {
              return <div className="movie" key={index}>
                <Link to={`/booking/${value._id}`}><figure className="movie-poster"><img src={value.img_url} alt={value.movie_name} style={{ width: '220px', height: '300px' }} /></figure></Link>
                <div className="movie-title">
                  <Link to={`/booking/${value._id}`}>{value.movie_name}</Link>
                </div>
                <p><strong>Category:</strong> {value.category}</p>
                <p><strong>Languages:</strong> {value.languages}</p>
                <strong>Rating:</strong>
                <div className="star-rating" title="Rated 4.00 out of 5">
                  <span style={{ width: '80%' }}>
                    <strong className="rating">4.00</strong> out of 5
                  </span>
                </div>
                <p>{value.description}</p>
                {userStatus === "user" ? <p style={{ display: 'none' }}>
                  <button className='button' onClick={() => deleteBlog(value._id)}>Delete</button>
                  &nbsp;
                </p> :
                  <p>
                    <p><strong>No Of Ticket Sold :</strong> {(value.no_seats) - (value.avaiable_no_seats)}</p>
                    <button className='button' onClick={() => deleteBlog(value._id)}>Delete</button>
                    &nbsp;
                  </p>}
              </div>

            })}

          </div>

          <div className="pagination">
            <a href="#" className="page-number prev"><i className="fa fa-angle-left"></i></a>
            <span className="page-number current">1</span>
            <a href="#" className="page-number">2</a>
            <a href="#" className="page-number">3</a>
            <a href="#" className="page-number">4</a>
            <a href="#" className="page-number">5</a>
            <a href="#" className="page-number next"><i className="fa fa-angle-right"></i></a>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ViewallMovies