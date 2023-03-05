const customOrdersProposalscontroller=require("../controllers/customOrderProposalsController.js")
const express=require("express")
const route=express.Router()






route.post("/get_proposals",async function( req,res){
    
        let proposals = await customOrdersProposalscontroller.post_new_proposal (req.body.id)
        res.json({
            messege:"Get all proposals of this custom order successfully",
            status:200,
            data:proposals,
        })
       
        
    })


route.post("/add_proposal",async function( req,res){
        console.log("here in add proposal route");
        let new_proposal_that_added = await customOrdersProposalscontroller.post_new_proposal (req.body)
        res.json({
            message:"Added new proposal succsessfulle",
            status:200,
            data:new_proposal_that_added
        })
       
        
    })




    module.exports=route














// const path=require("path")
// const jwt=require("jsonwebtoken")
// const { JsonWebTokenError } = require("jsonwebtoken")
// const fs=require("fs");
// const bcrypt=require("bcryptjs")
// const userModel = require("../models/usersModel.js")
// let secret = fs.readFileSync('secret.key')

// const {verifyToken} = require('../shared/functions')

//************************ Update ************************

// route.post("/update",verifyToken,async function (req,res){
//     console.log(req.token)
//     jwt.verify(req.token,secret,async (err,data)=>{
//         if(err){
//             // law mafe4 token 
//             res.send(403)
//         }
//         else{

//             // console.log("updated successfully");

//             console.log("req.body = ++++++++++ ",req.body);
//             console.log("Data = ******** ",data);
//             // if(req.body.f_name!=""  req.body.l_name!="")
//             // {
//                 // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

//                 // // console.log(typeof req.body.f_name)
//                 // // console.log(req.body.f_name)

//                 // await userController.update_user_firstAndLastNames (data.email,req.body.f_name,req.body.l_name);
            
//             // }
//             // else
//              if(req.body.f_name!=undefined )
//             {
//                 //  data.f_name=req.body.f_name;
//                 //  data.save()
//                  console.log("ggggggggggggggggggggggggggggggggggggggggggggggggg")

//                 data =await userController.update_user_firstName (data._id,req.body.f_name);
//                 console.log(data);
//             }
//             else if( req.body.l_name!="")
//             {
//                 await userController.update_user_lastName (req.body.l_name);
//             }
//             else if(req.body.email!="" )
//             {
//                 await userController.update_user_email (req.body.email);
//             }
//             else if(req.body.password!="" )
//             {
//                 await userController.update_user_password (req.body.password);
//             }
//             else if(req.body.state!="" && req.body.city!="" && req.body.zip!="" )
//             {
//                 await userController.update_user_stateAndCityAndZip (req.body.state,req.body.city,req.body.zip);
//             }
//             else if(req.body.state!="" )
//             {
//                 await userController.update_user_state (req.body.state);
            
//             }
//             else if(req.body.city!="" )
//             {
//                 await userController.update_user_city (req.body.city);
//             }
//             else if(req.body.zip!="" )
//             {
//                 await userController.update_user_zip (req.body.zip);
//             }
//             else{
//                 console.log("ggggggggggggggggggggggggggggggggggggggggggggggggg")
//                 await userController.update_user_allData (req.body);
//             }
//             res.json({
//                 messege:"data updated successfully",
//                 user_data:data
//             })
//         }
//     })
    


// })

//************************ Register ************************

// route.post("/register",async function (req,res){

//     if(req.body.f_name===""|| req.body.l_name=="" || req.body.email==""||req.body.password=="" ||req.body.confirmPassword=="" ||req.body.user=="" )
//     {
//         res.send("Error : you should insert valid values")
//     }
//     else
//     {
//         //  if email exist console email aready exist
//         let exist=await userController.check_if_email_exist(req.body.email);

//             if(exist[0]){
//             res.send("email aready exist sssss")
//         }
//         else{
//             // ............... dcrypt ...............
//             // console.log("Before Hashed= "+req.body.password);
//             const hashedPassword = await bcrypt.hash(req.body.password,10)
//             req.body.password=hashedPassword;
//             // console.log("After Hashed= "+req.body.password);
//             // ................. End of dycrypt ......................
//             let new_user=await userController.register_new_user(req.body);
//             res.json({
//                 message:"Successfull regestration go to sign in",
//                 status:200,
//                 data:new_user,
//             })
//         }


        
//     }

// })



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
















// ******************************************** Comments ************************