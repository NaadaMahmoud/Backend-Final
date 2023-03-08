const userModel = require('../models/usersModel');
const mongoose= require('mongoose')
const productModel = require('../models/vendor-products')
const jwt = require('jsonwebtoken');
const fs=require("fs");
let secret = fs.readFileSync('secret.key')

let userId;

////////////// Get All //////////////

let getAll = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            const userList = await userModel.findOne({_id:userId})
            try{
                res.json({
                    data:userList.wishlist
                })
            }catch(err){
                console.log(err);
            }
        }
    })
}

/////////// Add to List /////////////

let addToList = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            let ifExists = await checkIfProductIsAdded(req.body._id)
            if(ifExists){
                console.log("product has been added already")
            }else{
                const product=new productModel(req.body)
                // console.log(product)
                    try{
                        updateArray(product)
                    }catch(e){
                        console.log("error pushing into the array")
                    }
            }
        }
    })
}

//check if the product exsits in user's wishlist
async function checkIfProductIsAdded(productId){
    let flag=false;
    let result = await userModel.findOne({_id:userId}).then((data)=>{
        data.wishlist.forEach((item)=>{
            if(item._id == productId){
                flag=true;
                console.log("true")
            }
            
        })
        console.log(data,"aaaaaaaaaaaaaaaaaaaaaaaaa");
    })
    return flag;
}
//push product into user's wishlist
async function updateArray(product){
    let add = await userModel.updateOne({ _id: userId }, { $push: { wishlist: product}});
    console.log('pushed successfully')
}

//////////// Remove From List //////////

let removeFromList = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            await userModel.findOne({_id:userId}).then((data,err)=>{
                let result = data.wishlist.filter((item)=>{
                     return item._id != req.params.id
                 })
                 data.wishlist =result;
                 data.save();
 
                 res.send(data.wishlist)
             })
        }
    })
}

///////////////////////////////////////

module.exports={getAll, addToList, removeFromList}