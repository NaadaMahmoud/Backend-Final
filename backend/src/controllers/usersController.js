const userModel = require("../models/usersModel.js")

const jwt = require('jsonwebtoken');
const fs = require("fs");
let secret = fs.readFileSync('secret.key')

// ******************** Update *************************

// ........... update_user_allData ..............

async function update_user_allData (email,newData){

    let updated_user_allData = await userModel.updateOne({email:email},newData)
    return updated_user_allData ;
}

// ........... update_user_firstAndLastNames ..............

async function update_user_firstAndLastNames (email,f_name,l_name){
    // console.log("object");
    let update_user_firstAndLastNames = await userModel.updateOne({email:email},{f_name:f_name,l_name:l_name})
    console.log(update_user_firstAndLastNames);
    
    return update_user_firstAndLastNames ;
}


// ........... update_user_firstName ..............

async function update_user_firstName (id,f_name){

//     let updated_user_firstName = await userModel.findOne({_id:id})
//     updated_user_firstName.f_name=f_name;
//     console.log("updated_user_firstName_successfully")
//     console.log(updated_user_firstName)
//     return updated_user_firstName ;
    // .................................................
    userModel
                .findOne({ _id: id })
                .then((Data) => {
                    Data.f_name = f_name;
                    // Data.phoneNumber = body.phoneNumber;
                    Data.save();
                    
                })
                .catch((err) => {

                });

}



// ........... update_user_lastName ..............

async function update_user_lastName (email,l_name){

    let updated_user_lastName = await userModel.updateOne({email:email},{l_name:l_name})
    console.log("updated_user_lastName_successfully")
    return updated_user_lastName ;
}
// ........... update_user_email ..............

async function update_user_email (old_email,new_email){
   
    let updated_user_email = await userModel.updateOne({email:old_email},{email:new_email})
    console.log("updated_user_email_successfully")
    return updated_user_email ;
}

// ........... update_user_password ..............

async function update_user_password (email,password){
 
    let updated_user_password = await userModel.updateOne({email:email},{password:password})
    console.log("updated_user_password_successfully")
    return updated_user_password ;
}


// ........... update_user_password ..............

async function update_user_state (email,state){
 
    let updated_user_state = await userModel.updateOne({email:email},{state:state})
    console.log("updated_user_state_successfully")
    return updated_user_state ;
}



// ........... update_user_city ..............

async function update_user_city (email,city){
 
    let update_user_city = await userModel.updateOne({email:email},{city:city})
    console.log("updated_user_city_successfully")
    return update_user_city ;
}



// ........... update_user_zip ..............

async function update_user_zip (email,zip){
 
    let updated_user_zip = await userModel.updateOne({email:email},{zip:zip})
    console.log("updated_user_zip_successfully")
    return updated_user_zip ;
}



// ******************** check_if_email_exist *************************


async function check_if_email_exist (email){
    email=email.toLowerCase();
    console.log(email)
    let response = await userModel.find({email:email})
    return response;
}


// ******************** Login *************************

async function login_user (email){
    email=email.toLowerCase();
    // console.log(email)
    let existed_user_data = await userModel.findOne({email:email})
    return existed_user_data;    

}

// ******************** Register *************************

async function register_new_user (user_data){
    user_data.email=user_data.email.toLowerCase();
    // console.log(user_data.email);
    console.log("data from controller = ",user_data)
    let new_user = await userModel.create(user_data)
    return new_user
}





// ******************** CHECKOUT Doha *************************

let get_All_cart_Product= async (req, respons) => {
    console.log(req)
    jwt.verify(req.token, secret, async (err, data) => {
        
        if (err) {
            // law mafe4 token 
            respons.sendStatus(403)
        }
        else {
            id = data.data_of_login_user._id
            // console.log(data.data_of_login_user._id)
            let res = await userModel.findOne({ _id: id });
            let Totals = 0;
            
            res.cart.map((item) => {
                Totals += item.subTotal;
            })
            // console.log(res.cart)
            console.log(Totals)
            let order = { products: res.cart, Total_price: Totals }
            res.orders.push(order) 
            
            // res.cart = [];
            res.save();
            return respons.json(res.orders[res.orders.length - 1]);
           
        }
    })
}
 




// ******************** CHECKOUT  post_address_Data Doha *************************

let post_address_Data = async (req, respons) => {

    jwt.verify(req.token, secret, async (err, data) => {

        if (err) {
            // law mafe4 token 
            respons.sendStatus(403)
        }
        else {
            id = data.data_of_login_user._id
            
            console.log(".............................................")
            console.log( "jjjjjjjjj",id)
            let res = await userModel.findOne({ _id: id }).then(doc =>{
                doc.orders[doc.orders.length - 1].address = {

                    street: req.body.address.street,
                    town: req.body.address.town,
                    apartment: req.body.address.apartment,
                    country: req.body.address.country,
                    postcode: req.body.postcode,
                },
                 doc.orders[doc.orders.length - 1].notes = req.body.addInfo
                doc.save()
               console.log('data address save')
            });
            
            }
        }
    )
}




// ******************** CHECKOUT paypal *************************
// 
let CHECKOUT_paypal = async (req, respons) => {

    jwt.verify(req.token, secret, async (err, data) => {

        if (err) {
            // law mafe4 token 
            respons.sendStatus(403)
        }
        else {
            id = data.data_of_login_user._id

            let res = await userModel.findOne({ _id: id }).then(doc => {

                doc.cart=[];
                doc.orders[doc.orders.length - 1].products.map((product) =>{
                    productModel.findOneById(product.product._id).then((current)=>{
                        current.quantity -= product.product.quantity
                        current.save()
                    })
                
                    console.log(product.product._id)  
                })
              doc.save()  
            });

        }
    }
    )
}

module.exports={
    login_user,
    register_new_user,
    update_user_allData,
    update_user_password,
    update_user_email,
    update_user_firstName,
    update_user_lastName,
    check_if_email_exist ,
    update_user_firstAndLastNames,
    update_user_state,
    update_user_city,
    update_user_zip,
    get_All_cart_Product,
    post_address_Data,
    CHECKOUT_paypal

}


// ******************************************** Comments ************************



// async function add_blog_to_user (userName,blogName){

//     let userName_who_add_blog = await userModel.findOne({userName:userName})
//     console.log("number of items in array = "+userName_who_add_blog.userBlogs.length)
//     let user_who_add_blog = await userModel.updateOne({userName:userName},{$push:{"userBlogs":blogName}})
//     let userName_who_add_blog2 = await userModel.findOne({userName:userName})
//     console.log("number of items in array = "+userName_who_add_blog2.userBlogs.length)
//     return user_who_add_blog
// }

// ......................................................

// async function login_user (email,password){
//     // console.log("email in controller : "+email);
//     // console.log("password in controller : "+password);
//     let existed_user_data = await userModel.find({
//         $and:[{email:email},{password:password}]
//     })
//     return existed_user_data;
// }

// ...................................................


// async function delete_user (id){
//     let deleted_user = await userModel.deleteOne({_id:id})
//     return deleted_user ;
// }

// .........................................................



