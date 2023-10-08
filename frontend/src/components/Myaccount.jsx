import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Table.css';

const Myaccount = () => {

    const [Username, setUsername] = useState(sessionStorage.getItem('Username'));
    const [email, setemail] = useState(sessionStorage.getItem('email'));
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
    const [bookingData, setBookingData] = useState([]);


    useEffect(() => {
          // Fetch user's booking history when the component mounts
          const fetchBookingData = async () => {
            try {
                // Make a request to your backend API to get the user's booking data
                const response = await axios.get(`http://localhost:3000/api/userbookings/${userId}`);

                // Extract movie IDs from the booking data
                const movieIds = response.data.map((booking) => booking.movie_id);

                // Fetch movie details for each movie ID
                const movieDetailsPromises = movieIds.map((movieId) =>
                    axios.get(`http://localhost:3000/api/getmovie/${movieId}`)
                );

                // Wait for all movie details requests to complete
                const movieDetailsResponses = await Promise.all(movieDetailsPromises);

                // Merge movie details with booking data
                const enrichedBookingData = response.data.map((booking, index) => ({
                    ...booking,
                    movieDetails: movieDetailsResponses[index].data,
                }));

                setBookingData(enrichedBookingData);
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookingData();
    }, [userId]); // Fetch data whenever userId changes

    const handleLogout = () => {
        // Clear user data from session storage
        sessionStorage.removeItem('Username');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userId');

        // Navigate to the login page (you can replace "/login" with your actual login page path)
        window.location.href = '/login';
    };

    

    return (
        <div>
            <div className="container">
                <div className="page">
                    <div className="breadcrumbs">
                        <a href="/">Home</a>
                        <span>My Account</span>
                    </div>

                    <div className="entry-content" style={{ textAlign: 'center' }}>
                        <div className="row">
                            <div className="col-md-12">
                                <h2>My Account</h2>
                                <div className="contact-form">
                                    <div className="col-12">
                                    <h4>Welcome, {Username}!</h4>
                                        <p>Email: {email}</p>
                                        <h3>Booking History</h3>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Movie Name</th>
                                                    <th>Booked Seats</th>
                                                    <th>Ticket Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookingData.map((booking) => (
                                                    <tr key={booking._id}>
                                                        <td>{booking.movieDetails.movie_name}</td>
                                                        <td>{booking.booked_seats.join(', ')}</td>
                                                        <td>{booking.ticket_count}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <button onClick={handleLogout}>Log Out</button>
                                    </div>
                                   

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Myaccount