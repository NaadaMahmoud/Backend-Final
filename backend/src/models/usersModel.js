const mongoose=require("mongoose")

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

    order:{
        product:{type:Array},
        address:
        { 
            st: {
                type: String,
                default: "",
            },
            city: {
                type: String,
                default: "",
            },
            Country: {
                type: String,
                default: "",
            },
            Postcode: {
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
        },
    }
    
    // taxNumber:Number,

});


let userModel=mongoose.model("users",userSchema)
module.exports=userModel;
