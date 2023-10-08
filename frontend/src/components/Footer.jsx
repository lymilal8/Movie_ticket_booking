import React from 'react'

const Footer = () => {
  return (
    <div>   
      <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <div className="widget">
                  <h3 className="widget-title">About Us</h3>
                  <p>VB Movies including high street as well as high-end brands along with world-class entertainment and services</p>
                </div>
              </div>

              <div className="col-md-2">
                <div className="widget">
                  <h3 className="widget-title">Join Us</h3>
                  <ul className="no-bullet">
                    <li>Join Us Now</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-2">
                <div className="widget">
                  <h3 className="widget-title">Social Media</h3>
                  <ul className="no-bullet">
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Google+</li>
                    <li>Pinterest</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-2">
                <div className="widget">
                  <h3 className="widget-title">Newsletter</h3>
                  <form action="#" className="subscribe-form">
                    <input type="text" placeholder="Email Address" />
                  </form>
                </div>
              </div>
            </div> {/* .row */}

            <div className="colophon">Copyright 2023 VB Movies, Designed by Lymi. All rights reserved</div>
          </div> {/* .container */}
        </footer>


    </div>
  )
}

export default Footer