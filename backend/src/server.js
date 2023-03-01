const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const vendorRouter = require('./router/vendor-product.router');
const dbConnect = require('./config/database.config')
const userRoute = require("./router/userRoute"); 

const app = express();
dotenv.config();

dbConnect();

var bodyParser = require('body-parser')
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

//to define the static files folder
app.use(express.static("images")); 

/////////////////////// cors ////////////////////////////////////
//angular on localHost 4200
//backend on localHost 5000
app.use(cors({
    credentials:true,
    origin:'http://localhost:4200'
}));

///////////////////// routes ////////////////////////////

app.use("/vendor",vendorRouter)
app.use("/users",userRoute)

//////////////////////// port /////////////////////////

app.listen(5000,()=>{
    console.log("localhost : 5000")
});