const mongoose=require("mongoose")

let userSchema=mongoose.Schema({
    f_name:{type:String,required:true},
    l_name:{type:String,required:true},
    email:{type:String,required:true,uniqe:true},
    // phone:String,
    // image:String,
    userType:{
        type:String,
        required:true,
        enum: {
            values: ['client', "vendor"],
            message: "Invalid privilege"
        }
    },
    password:{type:String,required:true},
    // city:String,
    // state:String,
    // zip:Number,
    taxNumber:Number,
    cart:{type:Array,required:true},
    // order:{
    //     product: mongoose.Types.ObjectId,
    //     ref: "product",
    //     address:
    //     {
    //         blockNumber: {
    //             type: Number,
    //             default: 0,
    //         },
    //         st: {
    //             type: String,
    //             default: "",
    //         },
    //         city: {
    //             type: String,
    //             default: "",
    //         },
    //         area: {
    //             type: String,
    //             default: "",
    //         },
    //     },
    //     time: {
    //         type: Date,
    //         default: Date.now,
    //         required: true,
    //     },
    // }
    
    // taxNumber:Number,

});


let userModel=mongoose.model("users",userSchema)
module.exports=userModel;
