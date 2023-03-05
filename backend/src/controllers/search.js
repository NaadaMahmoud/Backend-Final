const asyncHandler=require('express-async-handler')
const user = require("../models/usersModel.js")

const product= require('../models/vendor-products')
exports.getProducts= asyncHandler(async(req,res)=>{
    const name=req.query.name
const products=await product.find({title:{$regex:name}})
    res.status(200).json({data:products,results:products.length})
})
exports.getProductsbyCategory= asyncHandler(async(req,res)=>{
    const id=req.query.id
    console.log(id)
const products=await product.find({category:id})
console.log(products)
    res.send(products)
})
exports.getProductsbyColor= asyncHandler(async(req,res)=>{
  
    const color=req.params.color
const des='#'+color
const products=await product.find({colors:des})
//  console.log(products)
    res.send(products)
})
exports.getAllColors= asyncHandler(async(req,res)=>{
  
const colors=await product.find({}, {colors:1, _id:0})
//  console.log(products)
    res.send(colors)
})


exports.getLowest= asyncHandler(async(req,res)=>{
    
const products=await product.find({}).sort({price: 1}).limit(1);
console.log(products)
    res.send(products)
})

// exports.getbyvendors= asyncHandler(async(req,res)=>{
    
//     const vendors=await user.find({userType:"vendor"})
//     console.log(vendors)
//         res.send(vendors)
//     })
exports.getbetweenvalues= asyncHandler(async(req,res)=>{
    
    const products=await product.find({ price: { $gt: 15, $lt: 100 }})
    
    console.log(products)
        res.send(products)
})
    

exports.getAll= asyncHandler(async(req,res)=>{
    
    const products=await product.find({})
    console.log(products)
        res.send(products)
    })
