const userController=require("../controllers/usersController.js")
const express=require("express")
const route=express.Router()
const path=require("path")
const jwt=require("jsonwebtoken")
const { JsonWebTokenError } = require("jsonwebtoken")
const fs=require("fs");
const bcrypt=require("bcryptjs")
const userModel = require("../models/usersModel.js")
let secret = fs.readFileSync('secret.key')

const {verifyToken} = require('../shared/functions')

//************************ Update ************************

route.post("/update",verifyToken,async function (req,res){
    console.log(req.token)
    jwt.verify(req.token,secret,async (err,data)=>{
        if(err){
            // law mafe4 token 
            res.send(403)
        }
        else{

            // console.log("updated successfully");

            console.log("req.body = ++++++++++ ",req.body);
            console.log("Data = ******** ",data);
            // if(req.body.f_name!=""  req.body.l_name!="")
            // {
                // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

                // // console.log(typeof req.body.f_name)
                // // console.log(req.body.f_name)

                // await userController.update_user_firstAndLastNames (data.email,req.body.f_name,req.body.l_name);
            
            // }
            // else
             if(req.body.f_name!=undefined )
            {
                //  data.f_name=req.body.f_name;
                //  data.save()
                 console.log("ggggggggggggggggggggggggggggggggggggggggggggggggg")

                data =await userController.update_user_firstName (data._id,req.body.f_name);
                console.log(data);
            }
            else if( req.body.l_name!="")
            {
                await userController.update_user_lastName (req.body.l_name);
            }
            else if(req.body.email!="" )
            {
                await userController.update_user_email (req.body.email);
            }
            else if(req.body.password!="" )
            {
                await userController.update_user_password (req.body.password);
            }
            else if(req.body.state!="" && req.body.city!="" && req.body.zip!="" )
            {
                await userController.update_user_stateAndCityAndZip (req.body.state,req.body.city,req.body.zip);
            }
            else if(req.body.state!="" )
            {
                await userController.update_user_state (req.body.state);
            
            }
            else if(req.body.city!="" )
            {
                await userController.update_user_city (req.body.city);
            }
            else if(req.body.zip!="" )
            {
                await userController.update_user_zip (req.body.zip);
            }
            else{
                console.log("ggggggggggggggggggggggggggggggggggggggggggggggggg")
                await userController.update_user_allData (req.body);
            }
            res.json({
                messege:"data updated successfully",
                user_data:data
            })
        }
    })
    


})

//************************ Register ************************

route.post("/register",async function (req,res){

    if(req.body.f_name===""|| req.body.l_name=="" || req.body.email==""||req.body.password=="" ||req.body.confirmPassword=="" ||req.body.user=="" )
    {
        res.send("Error : you should insert valid values")
    }
    else
    {
        //  if email exist console email aready exist
        let exist=await userController.check_if_email_exist(req.body.email);

            if(exist[0]){
            res.send("email aready exist sssss")
        }
        else{
            // ............... dcrypt ...............
            // console.log("Before Hashed= "+req.body.password);
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            req.body.password=hashedPassword;
            // console.log("After Hashed= "+req.body.password);
            // ................. End of dycrypt ......................
            let new_user=await userController.register_new_user(req.body);
            res.json({
                message:"Successfull regestration go to sign in",
                status:200,
                data:new_user,
            })
        }


        
    }

})



//************************ Login ************************

route.post("/login",async function( req,res){
    
    let data_of_login_user = await userController.login_user (req.body.email,req.body.password)
    // console.log(data_of_login_user);
    if(data_of_login_user.length==0)
    {
        res.status(401).send('Error:invalid credentials')
    }
    else{
     
        const user = await userModel.findOne({ email: req.body.email.toLowerCase() })
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (isValidPassword) {
                jwt.sign({data_of_login_user},secret,(err,token)=>{
                    console.log(data_of_login_user)
                    res.json({
                        message:"Login Successfully",
                        status:200,
                        data:user,
                        token:token,
                        userType:data_of_login_user.userType
                    })
            })
            }
            else {
                    }



    console.log("User logged in successfully ");
    
}
    
})


// *************************get_clientName*******************************
route.post("/get_clientName",async function( req,res){
    console.log("req.body");
    console.log(req.body);
    let clientId=req.body._doc.clientID
    console.log(clientId);
  
    let clinetData = await userModel.findOne ({_id:clientId})
    // console.log("sdcsdcsdcsdcsdcsdcsdc",clinetData);
    // let f_name=clinetData.f_name;
    // let l_name=clinetData.l_name;
    // let full_name=f_name + " "+l_name
    // let =f_name + " "+l_name
    // console.log(full_name);
    res.json({
        messege:"client data returned succsessfully",
        status:200,
        data:clinetData,
    })

    
//     if(data_of_login_user.length==0)
//     {
     
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
    
})



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
route.post("/deleteProduct/:id", async function (req, res) {
    let delete_Product = await userController.cart_delet_one_Product(req.params.id)
    res.send(delete_Product)
})



// ******************** CHECKOUT *************************

route.get("/order",verifyToken, userController.get_All_cart_Product)



// ******************** CHECK PAYMENT *************************
route.post("/CHECKPAYMENT", verifyToken, userController.post_address_Data)


// ******************** CHECKOUT paypal *************************
route.get("/CHECKOUTpaypal", verifyToken, userController.CHECKOUT_paypal)


route.get('/user', verifyToken, userController.getUserData)





route.get('/clients',userController.getAllClients)

route.get('/vendors',userController.getAllVendors)

module.exports=route




// ******************************************** Comments ************************

