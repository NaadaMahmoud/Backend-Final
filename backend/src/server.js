const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const searchRouter = require('./router/searchRoute');

const vendorRouter = require('./router/vendor-product.router');
const categoryRouter=require('./router/categoryRoute')
const subCategoryRouter=require('./router/subCategoryRoute')
const dbConnect = require('./config/database.config')
const route = require('./router/vendor-product.router.js');
const mongoose = require('./config/database.config')
const userRoute = require("./router/userRoute"); 
const cartRoute = require('./router/cartRoute')
const app = express();
dotenv.config();

dbConnect();

var bodyParser = require('body-parser');

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
app.use("/categories",categoryRouter)
app.use("/subcategories",subCategoryRouter)
app.use("/search",searchRouter)
app.use("/users",userRoute)
app.use("/cart",cartRoute)
//////////////////////// port /////////////////////////

app.listen(5000,()=>{
    console.log("localhost : 5000")
});