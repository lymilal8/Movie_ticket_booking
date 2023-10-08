const mongoose= require('mongoose');
mongoose.connect(process.env.uri)
.then(()=>{
    console.log('connect to mongodb atlas');
})
.catch((err)=>{
    console.log('Error!cannot connect');
})