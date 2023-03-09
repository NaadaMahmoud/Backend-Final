const customnOrderDetailsController=require("../controllers/customerOrderDetailsController.js")
const categoryModel=require("../models/category.js")
const subCategoryModel=require("../models/subCategory.js")
const express=require("express")
const route=express.Router()
// const path=require("path")
// const jwt=require("jsonwebtoken")
// const { JsonWebTokenError } = require("jsonwebtoken")
// const fs=require("fs");
// const bcrypt=require("bcryptjs")
// const userModel = require("../models/usersModel.js")
// let secret = fs.readFileSync('secret.key')

// const {verifyToken} = require('../shared/functions')







//************************ Get Job Details ************************

route.get("/details/:id",async function (req,res){

    // console.log("CustomOrderDetails  ID = ", req.params.id)
    let returnedCustomOrderDetails = await customnOrderDetailsController.getCustomOrderDetails_by_id (req.params.id)
    let category = await categoryModel.findById (returnedCustomOrderDetails.category)
    // console.log(category);
    
    // returnedCustomOrderDetails.category=category.name
    // console.log(returnedCustomOrderDetails);


    let subCategory = await subCategoryModel.findById (returnedCustomOrderDetails.subcategory)
    // console.log(subCategory);
    // returnedCustomOrderDetails.subcategory=subCategory.name
    // console.log(returnedCustomOrderDetails);
    res.json({
        messege:"Data reterned successfully",
        status:200,
        data:{
            ...returnedCustomOrderDetails,
            category:category,
            subCategory:subCategory},
    })



    

})



//************************ Login ************************

// route.post("/login",async function( req,res){
    
//     let data_of_login_user = await userController.login_user (req.body.email,req.body.password)
//     // console.log(data_of_login_user);
//     if(data_of_login_user.length==0)
//     {
//         res.status(401).send('Error:invalid credentials')
//     }
//     else{
     
//         const user = await userModel.findOne({ email: req.body.email.toLowerCase() })
//         const isValidPassword = await bcrypt.compare(req.body.password, user.password);
//             if (isValidPassword) {
//                 jwt.sign({data_of_login_user},secret,(err,token)=>{
//                     console.log(data_of_login_user)
//                     res.json({
//                         message:"Login Successfully",
//                         status:200,
//                         data:user,
//                         token:token,
//                         userType:data_of_login_user.userType
//                     })
//             })
//             }
//             else {
//                     }



//     console.log("User logged in successfully ");
    
// }
    
// })



//************************ verifyToken ************************

// function verifyToken (req,res,next){
//     const bearerHeader=req.headers['authorization']
//     // console.log(bearerHeader);
//     if(typeof bearerHeader!== "undefined"){
//         const bearer=bearerHeader.split(' ')
//         const token=bearer[1];
//         req.token=token
//         next()
//     }
//     else{
//         console.log("in verifyToken")
//         res.status(403).send("Error")
//     }
// }





///cart delete one item
// route.post("/deleteProduct/:id", async function (req, res) {
//     let delete_Product = await userController.cart_delet_one_Product(req.params.id)
//     res.send(delete_Product)
// })



// router.route("/find").get(function (req, res) {
//     football.find(
//         { "awards.award": "Golden Boot", "awards.numberOfTimes": 6 },
//         function (err, result) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.json(result);
//             }
//         }
//     );
// });




module.exports=route




// ******************************************** Comments ************************
