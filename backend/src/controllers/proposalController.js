const mongoose= require('mongoose')
const jwt = require('jsonwebtoken');
const fs=require("fs");
const CustomOrderModel = require('../models/customOrder');
const userModel = require('../models/usersModel')
let secret = fs.readFileSync('secret.key')

let userId;

/////////////// Get All /////////////////////////

let All = async (req,res)=>{
    
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            let prop = await CustomOrderModel.find({clientID:userId})
            // console.log(prop)
            res.json({
                data:prop,
                message:'custom orders'
            })
        }
    })
}

/////////////// Display Proposal Details ///////////////

let displayProposal = async (req,res)=>{

    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            userId=data.data_of_login_user._id;
            // let prop = await CustomOrderModel.findById(req.params.id)
            let output=[];
            let proposal = await CustomOrderModel.findOne({_id:req.params.id});
            let prop = await CustomOrderModel.findOne({_id:req.params.id}).then((data)=>{
                data.proposals.forEach( async (item)=>{
                    let user = await userModel.findById(item.userId)
                    output.push(Object.assign(item,{userFirstName:user.f_name},{userLastName:user.l_name}))
                    console.log(output)
                })
                
            })

            let client = await userModel.findById(userId);

            let obj ={proposal,output,client}
            // console.log(obj)
            res.send(obj)
    }
})
}

/////////////// Accept Proposal ///////////////

let accept = async (req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
             res.sendStatus(403)
        }
        else{
            //vendorId received in params but orderId received in body
            // console.log(req.body.orderId , "req.body.orderId")
            // console.log(req.params.id, "req.params.id")
            userId=data.data_of_login_user._id;
            let prop = await CustomOrderModel.findOne({"proposals.customOrderId":req.body.orderId,"proposals.userId":req.params.id}).then((data)=>{
                data.isclosed=true;
                data.proposals.filter((item)=>{
                    if(item.userId == req.params.id){
                        item.status="accepted"
                    }else{
                        item.status="canceled"
                    }
                })
                data.markModified('proposals');
                data.save();
            })
            res.json({
                message:"Proposal accepted",
            })
            }
        })
}

/////////////// Reject Proposal ///////////////

let reject = async (req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
             res.sendStatus(403)
        }
        else{
            //  vendorId received in params but orderId received in body
            userId=data.data_of_login_user._id;
            let prop = await CustomOrderModel.findOne({"proposals.customOrderId":req.body.orderId,"proposals.userId":req.params.id}).then((data)=>{
                data.proposals.filter((item)=>{
                    if(item.userId == req.params.id){
                        item.status="rejected"
                    }
                })
                data.markModified('proposals');
                data.save();
            })
            res.json({
                message:"Proposal rejected",
            })
            }
        })
}

////////////// Display Vendor /////////////////

let displayVendor = async (req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
             res.sendStatus(403)
        }
        else{
            let vendor = await userModel.findById(req.params.id)
            res.send(vendor)
        }
    })
}



module.exports={All, displayProposal, accept, reject, displayVendor}
