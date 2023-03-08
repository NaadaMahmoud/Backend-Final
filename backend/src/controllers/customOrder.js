const userModel = require('../models/usersModel');
const subCategoryModel=require('../models/subCategory')
const CategoryModel=require('../models/category')

const CustomOrderModel = require('../models/customOrder')
const asyncHandler=require('express-async-handler')
const jwt = require('jsonwebtoken');
const fs=require("fs");
let secret = fs.readFileSync('secret.key')

exports.createCustomOrder=asyncHandler(async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{
    console.log(data.data_of_login_user._id)
            let arr=[];
        
        for(const a of req.files){
            console.log("http://localhost:5000"+a.path.replace('images',''))
            arr.push("http://localhost:5000"+a.path.replace('images',''));
        
        }
        console.log(req.body.Color_Product)
        let dim = { 
            length : req.body.DimensionsL,
            width : req.body.DimensionsW,
            height : req.body.DimensionsH 
        }
        let p= { 
            min : req.body.min,
            max : req.body.max, 
        }
        const subcategoryto=await subCategoryModel.find({_id:req.body.subcategoryid})
        const categoryto=await CategoryModel.find({_id:req.body.categoryid})
        const subcategoryname=subcategoryto[0].name 
        const categoryname=categoryto[0].name    

        const name=req.body.name
            const category=req.body.categoryid
            const subcategory=req.body.subcategoryid
            const material=req.body.material
            const dimensions=dim
            const price=p
            const colors='#'+req.body.Color_Product
            const description=req.body.description
            const quantity=req.body.quantity*1
            const duedate=req.body.duedate
            const client=data.data_of_login_user._id
    const images= arr
    console.log(colors)
    const customOrder=await CustomOrderModel.create({name:name,category:category,categoryname:categoryname,subcategoryname:subcategoryname,subcategory:subcategory,images:images,dimensions:dimensions,material:material,colors:colors,price:price,description:description,quantity:quantity,duedate:duedate,clientID:client})
    
    res.status(201).json({data:customOrder})
        }
    )})
    