const userModel = require('../models/usersModel');
const mongoose= require('mongoose')
const productModel = require('../models/vendor-products')
const jwt = require('jsonwebtoken');
const fs=require("fs");
let secret = fs.readFileSync('secret.key')

let userId;

///////////////////////////////////////// Get All ////////////////////////////////////////

let getAll = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            const userCart = await userModel.findOne({_id:userId})
            try{
                //sending back only the products
                res.send(userCart.cart)
            }catch(err){
                console.log("error finding user's cart")
            }
        }
    })
}

////////////////////////////////////////// Add to Cart ////////////////////////////////////

let addToCart = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            //check if product exists in the user's cart
            let ifExists = await checkIfProductIsAdded(req.body._id)
            if(ifExists){
                console.log("product has been added already")
            }else{
                const product=new productModel(req.body)
                // console.log(product)
                    try{
                        updateArray(product)
                        res.send("DONE")
                    }catch(e){
                        console.log("error pushing into the array")
                    }
            }  
        }
    }) 
}

//check if the product exsits in user's cart
async function checkIfProductIsAdded(productId){
    // let result = await userModel.findOne({_id:userId,"cart.product._id":productId}).then((data)=>{
    //     console.log(data,"aaaaaaaaaaaaaaaaaaaaaaaaa");
    // })
    let flag=false;
    let result = await userModel.findOne({_id:userId}).then((data)=>{
        data.cart.forEach((item)=>{
            if(item.product._id == productId){
                flag=true;
                console.log("true")
            }
            
        })
        console.log(data,"aaaaaaaaaaaaaaaaaaaaaaaaa");
    })
    return flag;
}
//push product into user's cart
async function updateArray(product){
    
   let originalQty = product.quantity;
    product.quantity=1;
    let add = await userModel.updateOne({ _id: userId }, { $push: { cart: { product, originalQty: originalQty, subTotal:product.price}}});
    console.log('pushed successfully')
}
//////////////////////////////////////// Update Cart ////////////////////////////////////

let updateCart = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            // console.log(req.body)
            // const updated = userModel.updateOne({id:userId,'cart.id':req.params.id},{$set:{'cart.quantity':req.body.quantity}})
            await userModel.findOne({_id:userId}).then((data,err)=>{
                
                let result = data.cart.map((item)=>{
                    if(item.product._id.toString() === req.params.id){
                        if(item.product.quantity <= item.originalQty){
                            item.product.quantity = req.body.quantity;
                            item.subTotal = item.product.quantity * item.product.price;
                        }else{
                            item.product.quantity = item.originalQty;
                            item.subTotal = item.originalQty * item.product.price;
                        }
                       
                    }
                    return item;
                 })
                 try{
                    
                    data.cart=result;
                    data.markModified('cart');
                    data.save();
                 }catch(err){
                    console.log(err)
                 }
                 res.json({
                    message:"quantity updated",
                    data:data,
                    status:200
                })
                })

        }
    })
}

/////////////////////// Delete from Cart //////////////

let deleteFromCart = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            // const deleted = await userModel.findOneAndUpdate({ _id: userId}, { $pull: { cart: {_id: req.params.id}}})
            await userModel.findOne({_id:userId}).then((data,err)=>{
               let result = data.cart.filter((item)=>{
                    return item.product._id != req.params.id
                })
                data.cart =result;
                data.save();

                res.send(data.cart)
            })
        }
    })
}

/////////////////////// Empty Cart ///////////////////

let emptyCart = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            userId=data.data_of_login_user._id;
            // const deleted = await userModel.findOneAndDelete({ _id: userId}, { $pull: { cart: {_id: req.params.id }}})
            const empty = await userModel.findOneAndUpdate({_id:userId},{$set:{cart:[]}})
            try{
                res.send(empty.cart)
            }catch(err){
                console.log("error deleting")
            }
        }
    })
}

//////////////////////////////////////////////

module.exports = {addToCart, updateCart, deleteFromCart, emptyCart, getAll}