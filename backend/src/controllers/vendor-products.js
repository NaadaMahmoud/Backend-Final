const productModel = require("../models/vendor-products");
const jwt = require('jsonwebtoken');
const fs = require("fs");
let secret = fs.readFileSync('secret.key')

const CategoryModel = require('../models/category')
const subCategoryModel = require('../models/subCategory')
////////// All products (for Market) ////////////
let allProducts = async (req, res) => {
    const products = await productModel.find();
    res.send(products);
}

///////// Add product /////////////
let addProduct = async (req, res) => {
    jwt.verify(req.token, secret, async (err, data) => {
        if (err) {
            // law mafe4 token 
            res.sendStatus(403)
        }
        else {
            userId = data.data_of_login_user._id;
            let check = await productModel.find({ title: req.body.Title_Product });
            if (check.length == 0) {
                //for multer
                let pathLink = "http://localhost:5000/"
                let arr = [];
                for (const a of req.files) {
                    arr.push("http://localhost:5000"+a.path.replace('images',''));
                    ;
                    // console.log(a.path.split('\\')[1]);
                }

                let dim = {
                    length: req.body.DimensionsL,
                    width: req.body.DimensionsW,
                    height: req.body.DimensionsH
                }
                console.log(req.body.Color_Product.pop())
                const categoryname = req.body.Main_Category

                const category = await CategoryModel.find({ _id: categoryname })
                console.log(req.body.Sub_Category)
                console.log(req.body.Main_Category)
                const subcategories = await subCategoryModel.find({name:req.body.Sub_Category})
                    console.log(subcategories)
                const subcatid = subcategories[0]._id
                const subname = req.body.Sub_Category
                const colorarr=req.body.Color_Product
                // const subCategories = await subCategoryModel.find({ _id: subname })
                // const subcatid = subCategories[0]._id
                let product = new productModel({
                    title: req.body.Title_Product,
                    vendorID: userId,
                    images: arr,
                    quantity: req.body.avialble_Quntity,
                    price: req.body.Price,
                    dimensions: dim,
                    matrial: req.body.Material,
                    category: categoryname,
                    subcategory: subcatid,
                    colors:colorarr,
                    overview: req.body.Description
                })
                try {
                    product = await product.save()
                    console.log("product saved")
                    //console.log(colorarr)
                } catch (e) {
                    console.log(e)
                }
            } else {
                console.log("inside else")
                console.log("product already exists")
            }

        }
    })

}

///////// Get Product By Vendor Id (for vendor profile) /////////////
let getById = async (req, res) => {
    jwt.verify(req.token, secret, async (err, data) => {
        if (err) {
            // law mafe4 token 
            res.sendStatus(403)
        }
        else {
            userId = data.data_of_login_user._id;
            let products = await productModel.find({ vendorID: userId })
            try {
                res.send(products)
            } catch (err) {
                console.log(err)
            }
        }
    })
}


///////////// Delete ////////////
var deleteProductController = async (req, res) => {
    console.log(req.params.id);
    var result = await userService.removeUserDBService(req.params.id);
    if (result) {
        res.send({ "status": true, "message": "Product Deleted" });
    } else {
        res.send({ "status": false, "message": "Product Deleted failed" });
    }
}


//////////// Edit /////////////////
var updateProductController = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    
    var result = await userService.updateUserDBService(req.params.id,req.body);
 
     if (result) {
        res.send({ "status": true, "message": "Product Updated"} );
     } else {
         res.send({ "status": false, "message": "Product Updated Failed" });
     }
}

// ******************** get Product by id *************************

async function get_Product_by_id(id) {
    data = await productModel.findOne({ _id: id })
    return data;

}


// ******************** get all Product  *************************

async function get_all_Product() {
    data = await productModel.find()
    return data;

}




module.exports = { allProducts, addProduct, getById, deleteProductController, updateProductController, get_Product_by_id, get_all_Product }