const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const searchRouter = require('./router/searchRoute');

const vendorRouter = require('./router/vendor-product.router');
const categoryRouter=require('./router/categoryRoute')
const subCategoryRouter=require('./router/subCategoryRoute')
const dbConnect = require('./config/database.config')

dotenv.config();


dbConnect();

const app = express();

//angular on localHost 4200
//backend on localHost 5000

var bodyParser = require('body-parser');

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static("images"));


app.use(cors({
    credentials:true,
    origin:'http://localhost:4200'
}));

app.use("/vendor",vendorRouter)
app.use("/categories",categoryRouter)
app.use("/subcategories",subCategoryRouter)
app.use("/search",searchRouter)

app.listen(5000,()=>{
    console.log("localhost : 5000")
});