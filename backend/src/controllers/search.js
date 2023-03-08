const asyncHandler=require('express-async-handler')
const user = require("../models/usersModel.js")

const product= require('../models/vendor-products')
exports.getProducts= asyncHandler(async(req,res)=>{
    const name=req.params.name
const products=await product.find({title:{$regex:name}})
    res.status(200).json({data:products,results:products.length})
})
exports.searchProducts= asyncHandler(async(req,res)=>{
    const id=req.params.id
const products=await product.find({title:{$regex:name}})
    res.status(200).json({data:products,results:products.length})
})
exports.getProductsbyCategory= asyncHandler(async(req,res)=>{
    var arr=await product.find({})
    const id=req.body.catid
    const color=req.body.color
    console.log(color)
    const des='#'+color
    console.log(des)
    const vendid=req.body.vendid
    const min=req.body.minValue
    const  max=req.body.maxValue
    console.log(id)
    console.log(arr.length)
    console.log(req.body)
     if(id!==undefined){
        arr= arr.filter(product=>product.catergory==id)
        
        console.log(`category:${arr.length}`)
     }
    
    if(vendid!==undefined){
        arr=arr.filter(product=>product.vendorID==vendid)
        console.log(`vendor:${arr.length}`)

    }
    if(min!==undefined&&max!==undefined){
        arr=arr.filter(product=>product.price>min&&product.price<max)
        console.log(`price:${arr.length}`)

    }
    if(des!=='#undefined'){
        arr=arr.filter(product=>product.colors.find(elem=>elem==des)!==undefined)
        console.log(`color:${arr.length}`)

    }
//console.log(arr)
    res.send(arr)
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
var arr=[]
for (let index = 0; index < colors.length; index++) {
  arr.push((colors[index].colors))
    
}
 //console.log(arr)
    res.send(arr)
})


exports.getLowest= asyncHandler(async(req,res)=>{
    
const products=await product.find({}).sort({price: 1}).limit(1);
//console.log(products)
    res.send(products)
})

exports.getbyvendors= asyncHandler(async(req,res)=>{
    
    const vendors=await user.find({userType:"vendor"})
    // var arr=[]
    // for (let index = 0; index < vendors.length; index++) {
        
    //     arr.push(vendors[index].f_name)
        
        
    // }
   console.log(vendors)
        res.send(vendors)
    })

    exports.getProductsbyvendor= asyncHandler(async(req,res)=>{
      const id=req.params.id
        const products=await product.find({vendorID:id})
   
            res.send(products)
        })    
exports.getbetweenvalues= asyncHandler(async(req,res)=>{
    const min=req.params.min
    const  max=req.params.max
    const products=await product.find({ price: { $gt: min, $lt: max }})
    
    //console.log(products)
        res.send(products)
})
    

exports.getAll= asyncHandler(async(req,res)=>{
    
    const products=await product.find({})
    //console.log(products)
        res.send(products)
    })
