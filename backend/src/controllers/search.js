const asyncHandler=require('express-async-handler')

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

exports.getLowest= asyncHandler(async(req,res)=>{
    
const products=await product.find({}).sort({price: 1}).limit(1);
console.log(products)
    res.send(products)
})
