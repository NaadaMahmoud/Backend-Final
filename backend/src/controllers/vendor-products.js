const productModel = require("../models/vendor-products");
const jwt = require('jsonwebtoken');
const fs=require("fs");
let secret = fs.readFileSync('secret.key')

////////// All products (for Market) ////////////
let allProducts = async(req,res)=>{
    const products = await productModel.find();
    res.send(products);
}

///////// Add product /////////////
let addProduct = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            userId=data.data_of_login_user._id;
            let check = await productModel.find({title:req.body.Title_Product});
            if(check.length==0){
                //for multer
                let pathLink = "http://localhost:5000/"
                let arr=[];
                for(const a of req.files){
                    arr.push(pathLink+a.path.split('\\')[1]);
                    // console.log(a.path.split('\\')[1]);
                }

                let dim = { 
                    length : req.body.DimensionsL,
                    width : req.body.DimensionsW,
                    height : req.body.DimensionsH 
                }
                let product = new productModel({
                    title: req.body.Title_Product,
                    vendorID:userId,
                    images:arr,
                    quantity:req.body.avialble_Quntity,
                    price:req.body.Price,
                    dimensions:dim,
                    matrial:req.body.Material,
                    category:req.body.Main_Category,
                    subcategory:req.body.Sub_Category,
                    colors:req.body.Color_Product,
                    overview:req.body.Description
                })
                try{
                    product = await product.save();
                    console.log("product saved")
                }catch(e){
                    console.log(e)
                }
            }else{
                console.log("inside else")
                console.log("product already exists")
            }    

        }
    })
    
}

///////// Get Product By Vendor Id (for vendor profile) /////////////
let getById = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            userId=data.data_of_login_user._id;
            let products = await productModel.find({vendorID:userId})
            try{
                res.send(products)
            }catch(err){
                console.log(err)
            }
        }
    })
}

////////////// check if product already exists function //////////
module.exports = {allProducts, addProduct, getById}