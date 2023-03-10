const mongoose= require('mongoose')
const customOrderModel = require('../models/customOrder')
const jwt = require('jsonwebtoken');
const fs=require("fs");
const userModel = require('../models/usersModel');
let secret = fs.readFileSync('secret.key')

let userId;


/////////////////// Get All Jobs //////////////////

let getAll = async (req, res) => {
    let output= []
    let jobs = await customOrderModel.find()
        res.send(jobs)
}

// let getAll = async (req, res) => {
//     let clients = []
//     let orders = []
//     let jobs = await customOrderModel.find().then((data)=>{
//         orders.push(data)
//         data.forEach( async (item)=>{
//             let user = await userModel.findById(item.clientID)
//                 clients.push(user.f_name)
//                 // console.log(user.f_name)   
//                 console.log(clients)
//         })
//         //  res.send(clients)
//     })
    
//     // ;
// }

//////////////////// category filtration /////////////////

let categoryFilter = async (req, res) => {
    let jobs = await customOrderModel.find({category: req.params.category});
    res.send(jobs)
}

//////////////////////////////////////////////////////

let vendorJobs = async (req, res) => {
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            let jobs = await customOrderModel.find({"proposals.userId": userId});
            // console.log(jobs)
            res.send(jobs)
        }
    })
}


module.exports = { getAll, categoryFilter, vendorJobs}