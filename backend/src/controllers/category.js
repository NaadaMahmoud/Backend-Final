const CategoryModel = require("../models/category");
const asyncHandler=require('express-async-handler')

exports.getCategories= asyncHandler(async(req,res)=>{
    const categories=await CategoryModel.find({})
    res.status(200).json({data:categories,results:categories.length})
})
// exports.getCategoryByName= asyncHandler(async(req,res)=>{
//     const  name=req.params.name
//     const categories=await CategoryModel.find({name:name})

//     // res.status(200).send(categories[0]._id)
// })


exports.getCategoryById=asyncHandler( async(req,res)=>{
    const id=req.params.id
    const category= await CategoryModel.findById(id)
    if(!category){
        res.status(404).json({msg:`No category found with id ${id}`})
    }
    res.status(200).json({data:category})
})

exports.createCategory = asyncHandler(async (req, res) => {

    const name = req.body.name;
  const image = req.file.path
  const category= await CategoryModel.create({ name: name, image: image })
  res.status(201).json({ data: category })

});

exports.updateCategory= asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    const image= req.file.path
    const category=await CategoryModel.findOneAndUpdate({_id:id},{name:name},{image:image},{new:true})
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
