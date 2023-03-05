const express=require('express')
const Router=express.Router
const customOrderController=require('../controllers/customOrder')
const mongoTypes = require('mongoose').Types;
const multer = require('multer')
const {verifyToken} = require('../shared/functions')
const bcrypt=require("bcryptjs")
const { JsonWebTokenError } = require("jsonwebtoken")
const jwt=require("jsonwebtoken")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'images');
    },
    filename: function(req, file, cb){
        cb(null,Date.now()+file.originalname);
    }
})

const multerFilter = function (req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
        cb(null, true)
    }
    else {
        cb(new Error("Not image"), false)
    }
}
const upload = multer({storage: storage, fileFilter: multerFilter})

const router = Router();
// router.get("/", customOrderController.getCustomOrders)

router.post("/",verifyToken,upload.array("image_Product",100), customOrderController.createCustomOrder)
module.exports=router