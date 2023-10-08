const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors');

app.use(morgan('dev'));
require('dotenv').config();
require("./db/mongodb")
app.use(cors());

const api=require("./routes/movieRoute");
app.use("/api",api);

// const loginRouter = require("./routes/loginRoute");
// app.use("/api",loginRouter)

const userRouter = require("./routes/userRoute");
app.use("/api",userRouter);

const bookingRouter = require("./routes/bookingRoutes");
app.use("/api",bookingRouter);



const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
});

