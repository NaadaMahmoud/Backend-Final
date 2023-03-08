const express = require('express');
const userModel = require('../models/usersModel');

const Router = express.Router;
const router = Router();

router.get('/orders',async(req,res)=>{
    console.log("ORDERS")
    let i=0
    let ord = await userModel.find({userType:"client"}).then((data)=>{
        data.orders.forEach((item)=>{
            i++;
        })
        console.log(i)
    })
})

module.exports=router