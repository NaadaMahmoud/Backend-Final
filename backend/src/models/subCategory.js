const mongoose=require('mongoose')
const subCategorySchema=new mongoose.Schema({
    name:{type:String,
    trim:true,
    unique:[true,"This subcategory name already exsists"],
    minlength:[2,"Too short name"],
    maxlength:[60,"Name exceeded maximum length"]},
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'Subcategory must belong to main category']
    },image: { type: String, required:true }},{timestamps:true})

module.exports= mongoose.model('SubCategory',subCategorySchema)