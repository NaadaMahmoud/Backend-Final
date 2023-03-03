const asyncHandler=require('express-async-handler')
const subCategoryModel=require('../models/subCategory')
const CategoryModel=require('../models/category')

exports.createSubCategory=asyncHandler(async(req,res)=>{
    const name=req.body.name
    const categoryname=req.body.categoryname
    const category=await CategoryModel.find({name:categoryname})
    const catid= category[0]._id
    const image=  "http://localhost:5000"+req.file.path.replace('\images','')
    const subCategory=await subCategoryModel.create({name:name,category:catid,image:image}).populate({path:'category',select:'name -_id'})
    res.status(201).json({data:subCategory})
})
exports.createSubCategorybyId=asyncHandler(async(req,res)=>{
    const name=req.body.name
    const category=req.params.id
    console.log(category)
    const image=  "http://localhost:5000"+req.file.path.replace('\images','')
    const subCategory=await subCategoryModel.create({name:name,category:category,image:image})
    res.status(201).json({data:subCategory})
})
exports.getSubCategories= asyncHandler(async(req,res)=>{
    const subCategories=await subCategoryModel.find({})
    .populate({path:'category',select:'name -_id'})
    // console.log(subCategories[0].category.name)
    res.status(200).json({data:subCategories,results:subCategories.length})
})

exports.getSubCategoryById=asyncHandler( async(req,res)=>{
    const id=req.params.id
    const subCategory= await subCategoryModel.findById(id)
    if(!subCategory){
        res.status(404).json({msg:`No subcategory found with id ${id}`})
    }
    res.status(200).json({data:subCategory})
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
    const id=req.params.id
    const subCategory= await subCategoryModel.find({category:id})

    if(!subCategory){
        res.status(404).json({msg:`No category found with id ${id}`})
    }
    res.status(200).json({data:subCategory})
})
