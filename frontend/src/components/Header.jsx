import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const Header = () => {


  useEffect(() => {
    // Cloning main navigation for mobile menu
   if ($(".mobile-navigation .menu").length === 0) {
     $(".mobile-navigation").append($(".main-navigation .menu").clone());
   }
 
   // Mobile menu toggle
   $(".menu-toggle").click(function () {
     $(".mobile-navigation").slideToggle();
   });
 
   // Search form button click event
   $(".search-form button").click(function () {
     $(this).toggleClass("active");
     var $parent = $(this).parent(".search-form");
     $parent.find("input").toggleClass("active").focus();
   });
    
     
     return () => {
        // Remove any event listeners
     $(".menu-toggle").off("click");
     $(".search-form button").off("click");
     };
   }, []); // Empty dependency array means this effect runs once after the initial render

  const [userStatus, setUserStatus] = useState(sessionStorage.getItem("userStatus"));
  console.log(userStatus);

  return (
    <div>
      <header className="site-header">
        <div className="container">
          <a href="/movies" id="branding">
            <img src="images/logo.png" alt="" className="logo" />
            <div className="logo-copy">
              <h1 className="site-title">VB Movies</h1>
              <small className="site-description">Where Stories Come to Life</small>
            </div>
          </a>

          <div className="main-navigation">
            <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
            <ul className="menu">
              <li className="menu-item current-menu-item"><a href="/movies">Home</a></li>
              {userStatus ==="user"? <li className="menu-item">
              <a href="/myaccount">My Account</a>
                </li>:<li className="menu-item">
                  <a href="/addmovies">Add Movies</a>
                </li>}
              <li className="menu-item"><a href="/">Logout</a></li>
            </ul>

            <form action="#" className="search-form">
              <input type="text" placeholder="Search..." />
              <button><i className="fa fa-search"></i></button>
            </form>
          </div>

          <div className="mobile-navigation"></div>
        </div>
      </header>

      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light header">
          <div className="container-fluid">
            <a href="index.html" className="logo d-flex align-items-center">
                <img src="./assets/img/ict_logo.png" alt="" />
                <span className="d-none d-lg-block">Movies</span>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarButtonsExample"
              aria-controls="navbarButtonsExample"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarButtonsExample">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
                {userStatus ==="user"? <li class="nav-item">
                <a class="nav-link active " aria-current="page" href="#">Book/Cancel Tickets</a>
                </li>:<li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/addmovie">Add Movies</a>
                </li>}
                
                <li class="nav-item">
                  <a class="nav-link" href="/movies">Movies</a>
                </li>
              
              </ul>
             
              <div className="d-flex align-items-center">
                <div className="dropdown">
                    <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="./img/profile.png" className="rounded-circle" height="50" alt="Black and White Portrait of a Man" loading="lazy" /><p>{userStatus}</p>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                    
                    <li>
                        <a className="dropdown-item" href="/">Logout</a>
                    </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </nav> */}
    </div>
  )
}

export default Header