import React, { useEffect } from 'react';
import $ from 'jquery';
import MovieSchedule from './MovieSchedule'
import Footer from './Footer';

const Home = () => {
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

  return (
    <div>

      <div id="site-content">
        <header className="site-header">
          <div className="container">
            <a href="/" id="branding">
              <img src="images/logo.png" alt="" className="logo" />
              <div className="logo-copy">
                <h1 className="site-title">VB Movies</h1>
                <small className="site-description">Where Stories Come to Life</small>
              </div>
            </a>

            <div className="main-navigation">
              <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
              <ul className="menu">
                <li className="menu-item current-menu-item"><a href="/">Home</a></li>
                <li className="menu-item"><a href="/login">Login</a></li>
                <li className="menu-item"><a href="/register">SignUp</a></li>
              </ul>

              <form action="#" className="search-form">
                <input type="text" placeholder="Search..." />
                <button><i className="fa fa-search"></i></button>
              </form>
            </div>

            <div className="mobile-navigation"></div>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            <MovieSchedule />

            <div className="entry-content">
            <div className="row">
                <br /><br />
                <div className="col-md-9">
                  <h2 className="section-title">About US </h2>
                </div> 
              </div>
              <div className="row">
                
                <div className="col-md-4">
                  <figure><img src="dummy/figure.jpg" alt="figure image" style={{ width: '350px', height: '300px' }} /></figure>
                </div>
                <div className="col-md-8">
                  <p>Experience the best threatre in Thrissur along with the best restaurants in Thrissur Destination for best shopping malls in Thrissur, theatre in Thrissur, best pure veg restaurants in Thrissur. This shopping mall boasts stores including high street as well as high-end brands along with world-class entertainment and services. VB Movies houses three-screen luxury multiplexes, Funzone for kids, Food court, Hypermarket and other branded retail shops. Choices are varied and there is plenty to keep every palate happy from contemporary restaurants, quick bites and a spacious food court to juice bars, dessert joints and cafés. A one-stopping shopping paradise and more, VB Movies offers the best mix of retail, pure veg restaurants and entertainment. Pulsing with energy and style, it is the best gathering place where everyone is truly welcome to.

                    Where the stories comes to life.</p>
                </div>

              </div>
              <br /><br />
              <div className="row">
                <div className="col-md-9">
                  <h2 className="section-title">OUR FACILITIES </h2>
                  <ul class="arrow">
                    <li><p>A destination for shopping</p></li>
                    <li><p>Entertainment</p></li>
                    <li><p>Three-screen luxury multiplexes</p></li>
                    <li><p>Funzone for kids</p></li>
                    <li><p>Food court</p></li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <br /><br />
                <div className="col-md-9">
                <a href="/login"><h2 className="section-title">Book Now</h2></a>
                </div> 
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>

    </div>
  )
}

export default Home