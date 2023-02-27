const asyncHandler=require('express-async-handler')
const subCategoryModel=require('../models/subCategory')

exports.createSubCategory=asyncHandler(async(req,res)=>{
    const{name,category}=req.body
    const file=req.body.file
    const subCategory=await subCategoryModel.create({name:name,category:category,image:file})
    res.status(201).json({data:subCategory})
})
exports.getSubCategories= asyncHandler(async(req,res)=>{
    const subCategories=await subCategoryModel.find({})
    //.populate({path:'category',select:'name -_id'})
    res.status(200).json({data:subCategories,results:subCategories.length})
})
exports.getSubCategoryById=asyncHandler( async(req,res)=>{
    const {id}=req.params
    const subCategory= await subCategoryModel.findById(id)
    //.populate({path:'category',select:'name -_id'})
    if(!subCategory){
        res.status(404).json({msg:`No subcategory found with id ${id}`})
    }
    res.status(200).json({data:subCategory})
})
exports.updateSubCategory= asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {name,category}=req.body
    const file=req.body.file
    const subCategory=await subCategoryModel.findOneAndUpdate({_id:id},{name:name},{category:category},{image:file},{new:true})
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