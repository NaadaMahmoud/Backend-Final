const mongoose= require('mongoose')
const CustomOrderSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Title is required"],
    },
    clientID:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:true
    },
    images: { 
        type: Array 
    },
    quantity: {
        type: Number,
        required:true, 
        min:[1,"Quantity can't be zero"]
    },
    dimensions: {
        type: Object, 
        required:true
    },
    material: {
        type: String,
        required:true
    },
    colors: {
        type: Array, 
        required:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:true
    },
    price:{
        type:Object,
        required:true
    },
    subcategory:{
        type:mongoose.Schema.ObjectId,
        ref:'SubCategory',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isclosed:{
        type:Boolean,
        default:false
    },
    proposals:{
        type:Array
    },
    duedate:{
        type:Date,
        required:true
    }
    },
    {timestamps:true}
);

const CustomOrderModel=mongoose.model('CustomOrder',CustomOrderSchema);
module.exports=CustomOrderModel