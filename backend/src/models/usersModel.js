const mongoose=require("mongoose");
const { array } = require("mongoose/lib/utils");

let userSchema=mongoose.Schema({
    f_name:{type:String,required:true},
    l_name:{type:String,required:true},
    email:{type:String,required:true,uniqe:true},
    phone:String,
    image:String,
   
    userType:{
        type:String,
        required:true,
        enum: {
            values: ['client', "vendor","admin"],
            message: "Invalid privilege"
        }
    },
    password:{type:String,required:true},
    city:String,
    state:String,
    zip:Number,
    
    taxNumber:Number,

    cart:{type:Array},
    cart:Array, //cart:{type:Array,required:true},
    
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
