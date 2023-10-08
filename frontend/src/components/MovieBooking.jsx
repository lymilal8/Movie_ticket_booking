import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import './styles/Seat.css';



const MovieBooking = () => {
    const [userStatus, setUserStatus] = useState(sessionStorage.getItem("userStatus"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [email, setemail] = useState(sessionStorage.getItem("email"));
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);

    const [editedShowTime, setEditedShowTime] = useState(movieData?.show_time || '');
    const [editedTicketRate, setEditedTicketRate] = useState(movieData?.ticket_rate || '');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/getmovie/${movieId}`);
                console.log(response.data);
                setMovieData(response.data);

                // Set initial values when movieData changes
                setEditedShowTime(response.data.show_time);
                setEditedTicketRate(response.data.ticket_rate);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchData();
    }, [movieId]);

    useEffect(() => {
        // Fetch the booked seats from the server
        const fetchBookedSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/getBookedSeats/${movieId}`);
                setBookedSeats(response.data.bookedSeats);
            } catch (error) {
                console.error('Error fetching booked seats:', error);
            }
        };

        fetchBookedSeats();
    }, [movieId]);

    if (!movieData) {
        return <div>Loading...</div>; // Add a loading state
    }

    const {
        movie_name,
        img_url,  // Adjust this according to your actual property name
        category,
        languages,
        no_seats,
        avaiable_no_seats,
        cast,
        description,
        ticket_rate,
        show_time,


    } = movieData;

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSeats([]); // Reset selected seats when closing the modal
    };

    const handleBookTicket = async () => {
        try {
            // Check if user is authenticated
            if (!userId) {
                console.error('User not authenticated');
                return;
            }

            // Check if there are available seats
        if (movieData.avaiable_no_seats === 0) {
            alert('Sorry, there are no available seats. Booking is not possible.');
            return;
        }


            // Make a POST request to your backend API to book the tickets
            const response = await axios.post('http://localhost:3000/api/bookTicket', {
                userId,
                movieId,
                selectedSeats,
            });

            console.log(response.data.message); // Log the response message (you can handle it as needed)
            alert(response.data.message);


            // After successful booking, update the movie data
            const updatedMovieData = {
                avaiable_no_seats: movieData.avaiable_no_seats - selectedSeats.length,
                selected_seats: [...movieData.selected_seats, ...selectedSeats],
            };


            // Make a PUT request to update the movie data
            await axios.put(`http://localhost:3000/api/bookingedit/${movieId}`, updatedMovieData);

            // Now, you have successfully updated the movie data on the server.

            // Update the local state (if needed)
            setMovieData((prevData) => ({
                ...prevData,
                avaiable_no_seats: updatedMovieData.avaiable_no_seats,
                selected_seats: updatedMovieData.selected_seats,
            }));


              // After successful booking, trigger email confirmation
              await axios.post('http://localhost:3000/api/sendEmailConfirmation', {
                userEmail: email, // Assuming the user's email is stored in the 'email' state
                selectedSeats: selectedSeats.join(', '), // Convert array to a comma-separated string
            });


            // After successful booking, close the modal
            closeModal();

            // You can also trigger an email confirmation here if needed
        } catch (error) {
            console.error('Error booking tickets:', error);
            // Handle errors as needed (e.g., show an error message to the user)
        }
        closeModal();
        // You can also trigger an email confirmation here.

        // Redirect to another page after booking
        navigate('/movies'); // Adjust the path as needed
    };

    const handleSeatClick = (seatNumber) => {

        // Check if the seat is already booked
        if (bookedSeats.includes(seatNumber)) {
            // Seat is booked, do not allow selection
            return;
        }


        // Toggle the selected state of the seat
        const isSelected = selectedSeats.includes(seatNumber);
        const updatedSeats = isSelected
            ? selectedSeats.filter((seat) => seat !== seatNumber)
            : [...selectedSeats, seatNumber];

        // Update the selected seats state
        setSelectedSeats(updatedSeats);
    };

    // Function to determine the status based on avaiable_no_seats
    const getStatusColor = () => {
        if (movieData.avaiable_no_seats > 0) {
            return 'green'; // Available seats
        } else if (movieData.avaiable_no_seats > 0.5 * movieData.no_seats) {
            return 'orange'; // Fast Filling
        } else {
            return 'red'; // House Full
        }
    };


    // Function to open the edit modal
    const openEditModal = () => {
        setIsEditModalOpen(true);
    };


    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/movieedit/${movieId}`, {
                show_time: editedShowTime,
                ticket_rate: editedTicketRate,
            });

            console.log(response.data.message); // Log the response message
            alert("Update Sucessfully");
            // Update local movieData with the edited values
            setMovieData({
                ...movieData,
                show_time: editedShowTime,
                ticket_rate: editedTicketRate,
            });

            // Close the edit modal
            closeEditModal();
        } catch (error) {
            console.error('Error updating movie data:', error);
            // Handle errors as needed
        }
    };

    const cancel = () => {
        navigate('/movies');
    };


    return (
        <div>

            <div className="container">
                <div className="page">
                    <div className="breadcrumbs">
                        <a href="/movies">Home</a>
                        <span>Movie Booking </span>
                    </div>

                    <div className="content">

                        <div className="row">
                            <div className="col-md-6">
                                <figure className="movie-poster">
                                    <img src={img_url} alt="#" />
                                </figure>
                            </div>
                            <div className="col-md-6">
                                <h2 className="movie-title">{movie_name}</h2>
                                <div className="movie-summary">
                                    <p>
                                        {description}
                                    </p>
                                </div>
                                <ul className="movie-meta">
                                    <li>
                                        <strong>Rating      : </strong>
                                        <div className="star-rating" title="Rated 4.00 out of 5">
                                            <span style={{ width: '80%' }}>
                                                <strong className="rating"> 4.00</strong> out of 5
                                            </span>
                                        </div>
                                    </li>
                                    <li><strong>Category    :</strong>  {category}</li>
                                    <li><strong>Languages   :</strong>  {languages}</li>
                                    <li><strong>Show Time   :</strong>  {show_time}</li>
                                    <li><strong>Ticket rate :</strong>  {ticket_rate}</li>
                                </ul>

                                <ul className="starring">
                                    <li><strong>Casting:</strong>{cast}</li>

                                </ul>
                                {userStatus === "user" ? <p><button className='button' onClick={openModal}>Book Tickets</button>&nbsp; &nbsp; &nbsp;<button className='button' onClick={cancel}>Cancel</button></p>
                                    : <p><button className='button' onClick={openEditModal}>Edit Movie</button>&nbsp; &nbsp; &nbsp;<button className='button' onClick={cancel}>Cancel</button></p>

                                }
                                <Modal
                                    isOpen={isModalOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Book Tickets"

                                >
                                    <h2>BOOK TICKETS</h2>

                                    <h3>Ticket Availability :
                                        <span style={{ color: getStatusColor() }}>
                                            {movieData.avaiable_no_seats > 0
                                                ? 'Available'
                                                : movieData.avaiable_no_seats > 0.5 * movieData.no_seats
                                                    ? 'Fast Filling'
                                                    : 'House Full'}
                                        </span>
                                    </h3>

                                    <ul className="movie-meta">
                                        
                                        <li><strong>Total Seats :</strong> {no_seats}</li>
                                        <li><strong>Available No Of Seats :</strong> {avaiable_no_seats}</li>
                                    </ul>

                                    {/* Seat Booking Matrix */}
                                    <div className="seat-matrix">
                                        <h3>SELECT YOUR SEATS</h3>
                                        <div className="matrix-container">
                                            {/* Create a grid of seats based on the number of available seats */}
                                            {Array.from({ length: no_seats }, (_, index) => (
                                                <div
                                                    key={index}
                                                    className={`seat ${selectedSeats.includes(index + 1) ? 'selected' : ''} ${bookedSeats.includes(index + 1) ? 'booked' : ''
                                                        }`}
                                                    onClick={() => handleSeatClick(index + 1)}
                                                >
                                                    {index + 1}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '10px' }}>
                                    <strong><p>Selected Seats: {selectedSeats.join(', ')}</p></strong>
                                    <strong><p>Selected Seats Count: {selectedSeats.length}</p></strong>
                                    </div>
                                    

                                   <p><button className='button' onClick={handleBookTicket}>Book Ticket</button>
                                    &nbsp; &nbsp; &nbsp;<button className='button' onClick={closeModal}>Close</button> </p>                   
                                    
                                </Modal>

                                <Modal
                                    isOpen={isEditModalOpen}
                                    onRequestClose={closeEditModal}
                                    contentLabel="Edit Movie"

                                    style={{
                                        content: {
                                            width: '600px',
                                            margin: 'auto',
                                        },
                                    }}
                                >
                                    <h2>Edit Movie</h2>
                                    <ul className="movie-meta">
                                        <li><strong>Show Time :   </strong>    <input type="time" name="show_time" value={editedShowTime}
                                            onChange={(e) => setEditedShowTime(e.target.value)} /></li>
                                        <li><strong>Ticket Rate :</strong>      <input type="number" name="ticket_rate" value={editedTicketRate}
                                            onChange={(e) => setEditedTicketRate(e.target.value)} /></li>
                                    </ul>

                                    <button className='button' onClick={handleSave}>Save</button>&nbsp; &nbsp; &nbsp;
                                    <button className='button' onClick={closeEditModal}>Close</button>

                                </Modal>
                            </div>
                        </div> {/* .row */}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default MovieBooking