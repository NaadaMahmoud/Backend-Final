const express = require('express');
const Router = express.Router;
const asyncHandler = require('express-async-handler');
const expressAsyncHandler = asyncHandler.expressAsyncHandler
const productController = require('../controllers/vendor-products')

/////////////// multer ////////////////////

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

//////////////////////////////////////////

const router = Router();

///////////// All products ///////////////

router.get("/products", productController.allProducts);

//////////// Add product ///////////////

router.post("/products/add", upload.array("image_Product",100), productController.addProduct)

module.exports=router;