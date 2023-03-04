const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const product_schema = new Schema(
    {
        title: {type: String, required:true, unique:[true,"title must be unique"]},
        images: { type: Array, required:true },
        quantity: {type: Number, required:true, min:[1,"value must be more than 1"]},
        price: {type: Number, required:true},
        dimensions: {type: Object, required:true},
        matrial: {type: String, required:true},
        colors: {type: Array, required:true},
        rate: {type: Number, default:1},
        overview: {type: String, required:true},
        category: {type: String, required:true},//ref
        subcategory: {type: String, required:true},//ref
        vendorID:{type:String,default:"vID"},//ref
    },
    {
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        //saving the time of creation or editing
        timestamps:true
    }
)

// export const productModel = model('products', product_schema)

const productModel = model('products', product_schema)
module.exports= productModel;
