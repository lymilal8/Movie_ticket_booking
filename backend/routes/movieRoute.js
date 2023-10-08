const express = require('express');
const router=express.Router();
const jwt=require("jsonwebtoken");


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const movieData = require('../model/movieData');

//GET

router.get('/getdata/:token',async(req,res)=>{
    let data=await movieData.find();
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

//POST

router.post('/postdata',async(req,res)=>{
    try {
        const item=req.body;
        const newData= movieData(item);
        jwt.verify(req.body.token,"ict",
        (error,decoded)=>{
            if(decoded && decoded.email){
                newData.save();
                res.json({message:"movie added successfully"}); 
            }else{
                res.json({message:"Unauthorised user"});
            }

        }
        )
    }
    catch (err) {
        res.json({message:"Unable to add"});
        console.log(err);
    }
})


router.put('/edit/:id',async (req, res) =>{
    try {
        const item=req.body;
        const postid=req.params.id;
        console.log(postid);
       
        const updatedPut=await movieData.findByIdAndUpdate(postid,item);
        res.json({message:"Updated Successfully"});
    }
    catch (err) {
        
        console.log(err.message);
        res.status(400).json({message:"Unable to update"});
    }

});

//delete

router.delete('/delete/:_id',async  (req, res) =>{
    try {
        const empID=req.params._id;
        console.log(empID);
        const deletePost=await movieData.findByIdAndDelete(empID);
        console.log("deletePost");
        res.json({message:"Movie deletion successfull"});

    }
    catch (err) {
        res.status(404).json('unable to delete movie');
        console.log(err);
    }

});

//get movie by id

router.get('/getmovie/:_id', async (req, res) => {
    try {
      const movieId = req.params._id;
  
      const movie = await movieData.findById(movieId);
  
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/bookingedit/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const { avaiable_no_seats, selected_seats } = req.body;

      
                try {
                    const updatedMovie = await movieData.findByIdAndUpdate(
                        movieId,
                        { avaiable_no_seats, $push: { selected_seats: { $each: selected_seats } } },
                        { new: true }
                    );

                    res.json({ message: 'Movie updated successfully', updatedMovie });
                } catch (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
           
    } catch (err) {
        console.error('Error updating movie:', err);
        res.status(400).json({ message: 'Bad Request', error: err.message });
    }
});

// GET Endpoint - /api/getBookedSeats/:movieId
router.get('/getBookedSeats/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;

        // Fetch the movie data by ID
        const movie = await movieData.findById(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Return the booked seats for the movie
        res.json({ bookedSeats: movie.selected_seats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/movieedit/:id', async (req, res) => {
    const movieId = req.params.id;
    const { show_time, ticket_rate } = req.body;

    try {
        const updatedMovie = await movieData.findByIdAndUpdate(
            movieId,
            { show_time, ticket_rate },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie updated successfully', updatedMovie });
    } catch (error) {
        console.error('Error updating movie data:', error);

        // Log the entire error object for detailed information
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports=router;
