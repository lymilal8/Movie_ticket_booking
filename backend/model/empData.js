const mongoose= require('mongoose');
const empSchema=mongoose.Schema({
    name:String,
    address:String,
    phone:String,
    email:String,
    post:String,
    salary:String
   
});
const employeeModel=mongoose.model('empdata',empSchema);
module.exports=employeeModel;