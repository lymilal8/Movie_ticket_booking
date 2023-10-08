import React, { useState,useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


const Register = () => {

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

    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const inputHandler = (e) => {
        console.log("onchange");

        if (Object.keys(errors).length > 0) {
            validateFields();
        }



        setInputs({
            ...inputs, [e.target.name]: e.target.value
        })
        console.log(inputs);
    }

    const submitHandler = () => {
        if (validateFields()) {

            let data = {
                name: inputs.name,
                email: inputs.email,
                username: inputs.username,
                password: inputs.password,
                userStatus: "user"
            }

            console.log("onsubmit", data);
            axios.post("http://localhost:3000/api/signup", data)
                .then((response) => {
                    console.log(response);
                    console.log(response.data);
                    if (response.data.message === "Signup successfully") {
                        // alert(response.data);
                        // alert("Signup successfully");
                        alert(response.data.message);
                        navigate('/login');
                    }
                    else {
                        alert(response.data.message);
                    }
                })
                .catch(err => console.log(err))
        }

    }

    const validateFields = () => {
        const { name, email, username, password } = inputs;
        const newErrors = {};

        if (!name) {
            newErrors.name = 'Please enter your name!';
        }
        if (!email) {
            newErrors.email = 'Please enter your email!';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address!';
        }
        if (!username) {
            newErrors.username = 'Please enter your username!';
        } else if (username.length < 5) {
            newErrors.username = 'Username must be at least 5 characters long!';
        }
        if (!password) {
            newErrors.password = 'Please enter your password!';
        } else if (password.length < 5) {
            newErrors.password = 'Password must be at least 5 characters long!';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,}/.test(password)) {
            newErrors.password =
                'Password must contain at least one uppercase letter, one lowercase letter, and one number!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };




    return (
        <div>

            <div id="site-content">
                <header className="site-header">
                    <div className="container">
                        <a href="index.html" id="branding">
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
                        <div className="page">
                            <div className="breadcrumbs">
                                <a href="/">Home</a>
                                <span>Signup</span>
                            </div>

                            <div className="content">
                                <div className="row">
                                    <div className="col-md-4">
                                        <h2>Signup</h2>

                                        <div className="contact-form">
                                            <div className="col-12">
                                                <label htmlFor="" className="form-label">Name</label>
                                                <input type="text" className="name" name="name" onChange={inputHandler} />
                                                {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="" className="form-label">Email ID</label>
                                                <input type="text" name="email" className="email" onChange={inputHandler} />
                                                {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="" className="form-label">User Name</label>
                                                <input type="text" name="username" className="name" onChange={inputHandler} />
                                                {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}

                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="" className="form-label">Password</label>
                                                <input type="password" name="password" className="message" onChange={inputHandler} />
                                                {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                                            </div>
                                            <br />
                                            <div className="col-12">
                                                <p className="mb-0">
                                                    Already have an account? <a href="/login">Log in</a>
                                                </p>
                                            </div>
                                            <div className="col-12">
                                            <input type="submit" value="Create Account" onClick={submitHandler} />
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>

        </div>
    )
}

export default Register