const express = require('express');
const Router = express.Router;
const asyncHandler = require('express-async-handler');
const expressAsyncHandler = asyncHandler.expressAsyncHandler
const categoryController = require('../controllers/category')
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
router.get("/", categoryController.getCategories)
router.get("/:id",verifyToken, categoryController.getCategoryById)
router.get("/pag/:id",verifyToken, categoryController.getCategoryfor)

router.post("/add",verifyToken, upload.single('image'),categoryController.createCategory)
router.put("/:id",verifyToken, upload.single('image'),categoryController.updateCategory)
router.delete('/:id',verifyToken,categoryController.deleteCategory)
module.exports=router;