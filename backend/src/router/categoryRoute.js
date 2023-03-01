const express = require('express');
const Router = express.Router;
const asyncHandler = require('express-async-handler');
const expressAsyncHandler = asyncHandler.expressAsyncHandler
const categoryController = require('../controllers/category')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'images');
    },
    filename: function(req, file, cb){
        cb(null,Date.now()+file.originalname);
    }
})
const upload = multer({storage: storage})

const router = Router();
router.get("/", categoryController.getCategories)
router.get("/:id", categoryController.getCategoryById)
router.post("/add", upload.single('image'),categoryController.createCategory)
router.put("/:id", upload.single('image'),categoryController.updateCategory)
router.delete('/:id',categoryController.deleteCategory)
module.exports=router;