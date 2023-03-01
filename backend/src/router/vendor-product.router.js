const express = require('express');
const Router = express.Router;
const productController = require('../controllers/vendor-products')
const router = Router();
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
const multerFilter = function (req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
        cb(null, true)
    }
    else {
        cb(new Error("Not image"), false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: multerFilter
})

//////////////////////////////////////////

///////////// All products ///////////////

router.get("/products", productController.allProducts);

//////////// Add product ///////////////

router.post("/products/add", upload.array("image_Product",100), productController.addProduct)

module.exports=router;