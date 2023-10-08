const mongoose= require('mongoose');
const bookingSchema=mongoose.Schema({
    user_id:String,
    movie_id:String,
    booked_seats:Array,
    ticket_count:String,
});
const bookingModel=mongoose.model('bookingdata',bookingSchema);
module.exports=bookingModel;