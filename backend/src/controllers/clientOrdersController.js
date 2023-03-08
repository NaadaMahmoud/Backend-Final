const userModel = require('../models/usersModel');
const mongoose= require('mongoose')
const productModel = require('../models/vendor-products')
const jwt = require('jsonwebtoken');
const fs=require("fs");
let secret = fs.readFileSync('secret.key')

let userId;
////////////////// Get All /////////////////////////

let getAll = async(req,res)=>{
    jwt.verify(req.token,secret,async (err,data)=>{       
        if(err){
            // law mafe4 token 
            res.sendStatus(403)
        }
        else{
            //user id
            let products
            let sub=[]
            let output=[]
            userId=data.data_of_login_user._id;
            let test = await userModel.findById(userId)
            let order = await userModel.findById(userId).then((data)=>{
                data.orders.map((item)=>{
                products = item.products;
                products.total = item.Total_price
                sub.push(products)
                
                output.push(products)
            })
            console.log(test.orders)
                res.send(test.orders)
            })
            
            
            // products=order.orders[0].products
            // products.total = order.orders[0].Total_price
            //    console.log(output)

                // data.orders.map((item)=>{
                //     products=Object.assign(item.products,item.products[0].product)
                //     products[0].total=item.Total_price
                    
                //     //  output.push(products)
    // console.log(products)

                //     // total.push(item.Total_price)
                //     item.products.map((i)=>{
                //         // sub.push(i.subTotal)
                //     })
                    // products.push(item.product)
                // })
                   
                
            // })
            // console.log(products)
        }
    })
}

////////////////////////////////////////////////

module.exports = {getAll}