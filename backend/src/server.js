const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const vendorRouter = require('./router/vendor-product.router');
const dbConnect = require('./config/database.config')
// import dotenv from 'dotenv'
dotenv.config();
// import express from "express";
// import cors from "cors"
// import vendorRouter from './router/vendor-product.router'
// import { dbConnect } from './config/database.config';

dbConnect();

const app = express();

//angular on localHost 4200
//backend on localHost 5000
//that's why we used cors

var bodyParser = require('body-parser')
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(cors({
    credentials:true,
    origin:'*'
}));

app.use("/vendor",vendorRouter)

app.listen(5000,()=>{
    console.log("localhost : 5000")
});