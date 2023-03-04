const productModel = require("../models/vendor-products");
const  CategoryModel=require('../models/category')
const subCategoryModel=require('../models/subCategory')
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
        console.log(req.body.Main_Category)
        const categoryname=req.body.Main_Category
    const category=await CategoryModel.find({name:categoryname})
   console.log(category)
   const  catid=category[0]._id
    const subname=req.body.Sub_Category
    const subCategories=await subCategoryModel.find({name:subname})
    const subcatid= subCategories[0]._id
        let product = new productModel({
            title: req.body.Title_Product,
            images:arr,
            quantity:req.body.avialble_Quntity,
            price:req.body.Price,
            dimensions:dim,
            matrial:req.body.Material,
            category:catid,
            subcategory:subcatid,
            colors:req.body.Color_Product,
            overview:req.body.Description
        })
        try{
            product = await product.save()
            console.log("product saved")
        }catch(e){
            console.log(e)
        }
    }else{
        console.log("inside else")
        console.log("product already exists")
    }    
}


///////////// Delete ////////////
var deleteProductController = async (req, res) =>
{
     console.log(req.params.id);
     var result = await userService.removeUserDBService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "Product Deleted"} );
     } else {
         res.send({ "status": false, "message": "Product Deleted failed" });
     }
}


//////////// Edit /////////////////
var updateProductController = async (req, res) =>
{
    console.log(req.params.id);
    console.log(req.body);
    
    var result = await userService.updateUserDBService(req.params.id,req.body);
 
     if (result) {
        res.send({ "status": true, "message": "User Updateeeedddddd"} );
     } else {
         res.send({ "status": false, "message": "User Updateeeedddddd Faileddddddd" });
     }
}
module.exports = {allProducts, addProduct, deleteProductController, updateProductController}