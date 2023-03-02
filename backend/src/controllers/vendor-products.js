const productModel = require("../models/vendor-products");
////////// All products ////////////
let allProducts = async(req,res)=>{
    const products = await productModel.find();
    res.send(products);
}

///////// Add product /////////////
let addProduct = async(req,res)=>{
    
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

////////////// check if product already exists function //////////
module.exports = {allProducts, addProduct}