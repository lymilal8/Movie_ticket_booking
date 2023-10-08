const express = require('express');
const router=express.Router();
const jwt=require("jsonwebtoken");
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const bookingData = require('../model/bookingData');

//GET

router.get('/getdata/:token',async(req,res)=>{
    let data=await bookingData.find();
    try {
       jwt.verify(req.params.token,"ict",
       (error,decoded)=>{
        if(decoded && decoded.email){
            res.json(data);
        }else{
            res.json({message:"Unauthorised user"})
        }
       })
    }
    catch (err) {
        res.status(404).send('Data not found');
        console.log(err);
    }
})



// POST Endpoint - /api/bookTicket
router.post('/bookTicket', async (req, res) => {
    try {
        // Verify the JWT token for authentication
        // jwt.verify(req.body.token, "ict", (error, decoded) => {
        //     if (decoded && decoded.email) {
                // Create a new booking document
                const newBooking = new bookingData({
                    user_id: req.body.userId,
                    movie_id: req.body.movieId,
                    booked_seats: req.body.selectedSeats,
                    ticket_count: req.body.selectedSeats.length.toString(),
                });

                // Save the booking to the database
                newBooking.save();

                // Respond with a success message
                res.json({ message: "Booking successful" });
        //     } else {
        //         // Respond with an unauthorized message
        //         res.status(401).json({ message: "Unauthorized user" });
        //     }
        // });
    } catch (err) {
        console.error('Error booking tickets:', err);
        // Handle errors as needed (e.g., send an error response to the client)
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Configure the SMTP transport for Gmail
    const transporter = nodemailer.createTransport(
        smtpTransport({
        service: 'gmail',
        auth: {
            user: 'limipp61@gmail.com',
            pass: 'tafz wrbr lzar ppay'
        }
        })
    );

router.post('/sendEmailConfirmation', async (req, res) => {
    try {
        const userEmail = req.body.userEmail;
        const selectedSeats = req.body.selectedSeats;

        // Send email confirmation
        const subject = 'Ticket Booking Confirmation';
        const text = `Thank you for booking tickets from VB Movies!\n\n Your Seat Numbers are : ${selectedSeats}`;
        
        await transporter.sendMail({
            from: 'limipp61@gmail.com', // Sender's email address
            to: userEmail,
            subject: subject,
            text: text,
        });

        res.json({ message: 'Email confirmation sent.' });
    } catch (error) {
        console.error('Error sending email confirmation:', error);
        res.status(500).json({ error: 'Error sending email confirmation.' });
    }
});


// Define the route to fetch user bookings
router.get('/userbookings/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Assuming you have a Booking model with a schema similar to what you've defined
      const bookings = await bookingData.find({ user_id: userId });
  
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports=router;
