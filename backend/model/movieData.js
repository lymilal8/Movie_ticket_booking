const mongoose= require('mongoose');
const movieSchema=mongoose.Schema({
    movie_name:String,
    img_url:String,
    category:String,
    languages:String,
    cast:String,
    description:String,
    ticket_rate:String,
    no_seats:Number,
    avaiable_no_seats:Number,
    selected_seats:{
       type: Array,
       required: false,
    },
    show_time: {
        type: String,
        required: true,
    },
    adding_date:Date
   
});
const movieModel=mongoose.model('moviedata',movieSchema);
module.exports=movieModel;