const mongoose= require('mongoose')
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"category is required"],
        unique:[true,"category name must be unique"],
        minlength:[3,'Category name below minimum length'],
        maxlength:[60,'Category name exceeded maximum length']
    },
    image: { type: String, required:true }},
    {timestamps:true}
);

const CategoryModel=mongoose.model('Category',categorySchema);
module.exports=CategoryModel