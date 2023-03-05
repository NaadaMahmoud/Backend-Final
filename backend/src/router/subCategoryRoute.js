const express=require('express')
const router=express.Router()
const multer = require ('multer')
const subcategoryController = require('../controllers/subCategory')
const {verifyToken} = require('../shared/functions')
const bcrypt=require("bcryptjs")
const { JsonWebTokenError } = require("jsonwebtoken")
const jwt=require("jsonwebtoken")
const { getCategoryByName } = require('../controllers/category')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename: (req, file, cb)=>{
        console.log(file)
        cb(null,Date.now()+file.originalname)
    }
})
const upload = multer({storage:storage})
//router.route('/').get(getSubCategories).post(upload.single('file'),createSubCategory)
// router.route('/:id').get(getSubCategoryById).put(upload.single('file'),updateSubCategory).delete(deleteSubCategory)
router.get('/',subcategoryController.getSubCategories)
router.post("/add/:id",verifyToken, upload.single('image'),subcategoryController.createSubCategorybyId)
router.get("/:id",verifyToken,subcategoryController.getSubCategoryById)
router.put('/:id',verifyToken,subcategoryController.updateSubCategory)
router.get('/cat/:id',verifyToken,subcategoryController.getSubCategoriesOfCategoryById)
router.get('/:name',verifyToken,subcategoryController.getSubCategoriesOfCategoryBycatname)

module.exports=router