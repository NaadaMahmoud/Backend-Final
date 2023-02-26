const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const product_schema = new Schema(
    {
        title: {type: String, required:true},
        images: { type: Array, required:true },
        quantity: {type: Number, required:true},
        price: {type: Number, required:true},
        dimensions: {type: Array, required:true},
        matrial: {type: String, required:true},
        category: {type: String, required:true},
        subcategory: {type: String, required:true},
        colors: {type: Array, required:true},
        //setting the value of rate to be 1
        rate: {type: Number, default:1},
        overview: {type: String, required:true}
    },{
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
