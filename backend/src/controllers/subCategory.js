const asyncHandler=require('express-async-handler')
const subCategoryModel=require('../models/subCategory')
const CategoryModel=require('../models/category')
const jwt = require('jsonwebtoken');
const fs=require("fs");

let secret = fs.readFileSync('secret.key')

exports.createSubCategory=asyncHandler(async(req,res)=>{
    const name=req.body.name
    const categoryname=req.body.categoryname
    const category=await CategoryModel.find({name:categoryname})
    //const catid= category[0]._id
    const image=  "http://localhost:5000"+req.file.path.replace('images','')
    const subCategory=await subCategoryModel.create({name:name,category:catid,image:image}).populate({path:'category',select:'name -_id'})
    res.status(201).json({data:subCategory})
})
exports.createSubCategorybyId=asyncHandler(async(req,res)=>{
    const name=req.body.name
    const category=req.params.id
    console.log(category)
    const image=  "http://localhost:5000"+req.file.path.replace('images','')
    const subCategory=await subCategoryModel.create({name:name,category:category,image:image})
    res.status(201).json({data:subCategory})
})
exports.getSubCategories= asyncHandler(async(req,res)=>{
    const subCategories=await subCategoryModel.find({})

    // console.log(subCategories[0].category.name)
    res.status(200).json({data:subCategories,results:subCategories.length})
})
exports.getSubCategoriesbyName= asyncHandler(async(req,res)=>{
    const subname=req.body.Sub_Category
    const subCategories=await subCategoryModel.find({name:subname})
    const subcatid= subCategories[0]._id
    .populate({path:'category',select:'name -_id'},{path:'subCategory',select:'name -_id'})
    // console.log(subCategories[0].category.name)
    res.status(200).json({data:subCategories,results:subCategories.length})
})



exports.getSubCategoryById=asyncHandler( async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{
        // console.log(data. data_of_login_user[0]._id)
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            const id=req.params.id
            const subCategory= await subCategoryModel.findById(id)
            if(!subCategory){
                res.status(404).json({msg:`No subcategory found with id ${id}`})
            }
            res.status(200).json({data:subCategory})
}})
})
exports.getSubCategoryBy=asyncHandler( async(req,res)=>{
    
            const id=req.params.id
            console.log(id)
            const subcategory= await subCategoryModel.findById(id)
            // const name=subcategory
            
            console.log(`sending this: ${subcategory.name}`)
            if(!subcategory){
                res.status(404).json({msg:`No subcategory found with id ${id}`})
            }
            res.status(200).json({data:subcategory.name})
})

exports.updateSubCategory= asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {name,category}=req.body
    const image=  "http://localhost:5000"+req.file.path.replace('\images','')
    const subCategory=await subCategoryModel.findOneAndUpdate({_id:id},{name:name},{category:category},{image:image},{new:true})
    if(!subCategory){
        res.status(404).json({msg:`No subcategory found with id ${id}`})
    }
    res.status(200).json({data:subCategory})
})

exports.deleteSubCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const subCategory=await subCategoryModel.findByIdAndDelete(id)
    if(!subCategory){
        res.status(404).json({msg:`No subcategory found with id ${id}`})
    }
    res.status(200).json({data:subCategory})
})
exports.getSubCategoriesOfCategoryById=asyncHandler( async(req,res)=>{
    // jwt.verify(req.token,secret,async (err,data)=>{
    //     // console.log(data. data_of_login_user[0]._id)
    //     if(err){
    //         // law mafe4 token 
    //         res.sendStatus(403)
    //     }
    //     else{
            const id=req.params.id
            const subCategory= await subCategoryModel.find({category:id})
            if(!subCategory){
                res.status(404).json({msg:`No category found with id ${id}`})
            }
            res.status(200).json({data:subCategory})
})
exports.getSubCategoriesOfCategoryBycatname=asyncHandler( async(req,res)=>{

    jwt.verify(req.token,secret,async (err,data)=>{
   const  name=req.params.name
   console.log(name)
   const categories=await CategoryModel.find({name:name})
   console.log(categories)

const catid=categories[0]._id
            
            const subCategory= await subCategoryModel.find({category:catid})
        
            res.status(200).json({data:subCategory})
})})




