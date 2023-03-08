const mongoose=require("mongoose");
const { array } = require("mongoose/lib/utils");

let userSchema=mongoose.Schema({
    f_name:{type:String,required:true},
    l_name:{type:String,required:true},
    email:{type:String,required:true,uniqe:true},
    notification: {
        type: [
            {
                orderId: {
                    type: String,
                },
                productId: {
                    type: String,
                },
                payment: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                },
            }
        ]
    },
    userType:{
        type:String,
        required:true,
        enum: {
            values: ['client', "vendor"],
            message: "Invalid privilege"
        }
    },
    password:{type:String,required:true},
    
    taxNumber:Number,

    cart:{type:Array},
    wishlist:{type:Array},

   
   

    orders:{type: [
       { products: { type: Array },

        address: {
            street: {
                type: String,
                default: "",
            },
            town: {
                type: String,
                default: "",
            },
            country: {
                type: String,
                default: "EGYPT",
            }, 
            apartment: {
                type: String,
                default: "",
            },
            postcode: {
                type: Number,
                default: 0,
            },
        },
        notes: {
            type: String,
            default: '',
        },
        Total_price: {
            type: Number,
            default: '',
        },}
    ]}
       
    
    // taxNumber:Number,

});


let userModel=mongoose.model("users",userSchema)
module.exports=userModel;
