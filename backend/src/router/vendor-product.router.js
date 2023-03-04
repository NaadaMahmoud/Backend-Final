const express = require('express');
const productModel = require("../models/vendor-products");
const Router = express.Router;
const productController = require('../controllers/vendor-products')
const router = Router();
const mongoTypes = require('mongoose').Types;

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


////////////// Delete Product ////////////

router.delete("/products/delete/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    productModel.deleteOne({ _id: id })
      .then(() => {
        console.log("Deleted product successfully!");
      })
      .catch((err) => console.log(err));
  })


  ///////////// Edit Product /////////////
  
  router.get("products/edit/:id", async (req, res) => {
    const { id } = req.params;

    const getData = await productModel.findOne({ _id: id });
  })
//////////////// edit details /////////
router.post("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { title, images, quantity, price, dimensions, matrial, category, subcategory, colors, overview} = req.body;

    productModel.updateOne({ _id: id }, { title, images, quantity, price, dimensions, matrial, category, subcategory, colors, overview})
      .then(() => {
        console.log("successfully! updated the product!");
      })
      .catch((err) => console.log(err));
  });



//////////////// product details /////////

router.get("/products/byid/:id", async (req, res) => {
  const { id } = req.params;

  const getData = await productModel.findOne({ _id: id });
  try {
    res.send(getData)
  } catch (err) {
    console.log("error finding user's cart")
    console.log(err)
  }
  
})




  








module.exports=router;