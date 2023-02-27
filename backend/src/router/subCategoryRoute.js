const express=require('express')
const router=express.Router()
const multer = require ('multer')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../images')
    },
    filename: (req, file, cb)=>{
        console.log(file)
        cb(null,Date.now())
    }
})
const upload = multer({storage:storage})

const {createSubCategory,getSubCategories,getSubCategoryById,updateSubCategory,deleteSubCategory}=require('../controllers/subCategory')

router.route('/').get(getSubCategories).post(upload.single('file'),createSubCategory)
router.route('/:id').get(getSubCategoryById).put(upload.single('file'),updateSubCategory).delete(deleteSubCategory)
module.exports=router