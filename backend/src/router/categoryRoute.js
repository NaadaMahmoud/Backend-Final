const express=require('express')
const router=express.Router()
const multer = require ('multer')
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
const {createCategory,getCategories,getCategoryById,updateCategory,deleteCategory}=require('../controllers/category')

router.route('/').get(getCategories)
router.route('/add').post(upload.single('file'),createCategory)
router.route('/:id').get(getCategoryById).put(upload.single('file'),updateCategory).delete(deleteCategory)

module.exports=router