const express = require("express");
const app = express();

//
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");

dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


//Connect Database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/viblo');



//Routes

app.use('/api/auth', authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)




//listen port
app.listen(8800, () => {
     console.log("Backend server is running!");
   });