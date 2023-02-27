const CategoryModel = require("../models/category");
const asyncHandler=require('express-async-handler')

exports.getCategories= asyncHandler(async(req,res)=>{
    const categories=await CategoryModel.find({})
    res.status(200).json({data:categories,results:categories.length})
})

exports.getCategoryById=asyncHandler( async(req,res)=>{
    const {id}=req.params
    const category= await CategoryModel.findById(id)
    if(!category){
        res.status(404).json({msg:`No category found with id ${id}`})
    }
    res.status(200).json({data:category})
})
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const file = req.body.file;
  const category= await CategoryModel.create({ name: name, image: file })
  res.status(201).json({ data: category })

});

exports.updateCategory= asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    const file=req.body.file
    const category=await CategoryModel.findOneAndUpdate({_id:id},{name:name},{image:file},{new:true})
    if(!category){
        res.status(404).json({msg:`No category found with id ${id}`})
    }
    res.status(200).json({data:category})
})

exports.deleteCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const category=await CategoryModel.findByIdAndDelete(id)
    if(!category){
        res.status(404).json({msg:`No category found with id ${id}`})
    }
    res.status(200).json({data:category})
})
