const asyncHandler=require('express-async-handler')

const product= require('../models/vendor-products')
exports.getProducts= asyncHandler(async(req,res)=>{
    const name=req.query.name
    const products=await product.find({title:name})
    res.status(200).json({data:products,results:products.length})
})
