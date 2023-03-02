const userModel = require('../models/usersModel');
const productModel = require('../models/vendor-products')
const jwt = require('jsonwebtoken');
const fs=require("fs");
let secret = fs.readFileSync('secret.key')
////////////////////// Add to Cart /////////////////////

let addToCart = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{
        console.log(data.data_of_login_user._id)
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{

        }
    })

    // let add=await checkUserId(userId);
    // if(add.length!=0){
    //     let exists = await checkIfProductIsAdded(req.body.title)
    //     console.log(exists)
    //     if(exists.length!=0){
    //         console.log("prodect has been added already")
    //     }else{
    //         const product=new productModel(req.body)
    //         try{
    //             updateArray(product)
    //             console.log("pushing")
    //         }catch(e){
    //             console.log("error pushing")
    //         }
    //     }
    // }else{
    //     console.log("user doesn't exist")
    // }   
}

async function checkUserId(id){
    let result = await userModel.findById({_id:id});
    return result;
}
async function checkIfProductIsAdded(productTitle){
    let result = await userModel.find({_id:'63ffa76f497339b1ad9b2119'},{"product.title":productTitle});
    return result;
}

async function updateArray(product){
    let add=await userModel.updateOne({_id:'63ffa76f497339b1ad9b2119'},{$push : {product :product}});
    console.log('pushed successfully')
}
/////////////////////// Update Cart ////////////////////

let updateCart = async(req,res)=>{

}

/////////////////////// Delete from Cart //////////////

let deleteFromCart = async(req,res)=>{

}

/////////////////////// Empty Cart ///////////////////

let emptyCart = async(req,res)=>{

}

//////////////////////////////////////////////

module.exports = {addToCart, updateCart, deleteFromCart, emptyCart}