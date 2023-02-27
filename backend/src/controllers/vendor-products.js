const productModel = require("../models/vendor-products");
////////// All products ////////////
let allProducts = async(req,res)=>{
    const products = await productModel.find();
    res.send(products);
}

///////// Add product /////////////
let addProduct = async(req,res)=>{
    // console.log(req.files)
    let arr=[];
    for(const a of req.files){
        arr.push(a.path);
        console.log(a.path);
    }
    let dim = { 
        length : req.body.DimensionsL,
        width : req.body.DimensionsW,
        height : req.body.DimensionsH 
    }
    let product = new productModel({
        title: req.body.Title_Product,
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
        // console.log(arr)
    }catch(e){
        console.log(e)
    }
        
}

module.exports = {allProducts, addProduct}