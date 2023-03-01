const express = require('express');
const productModel = require("../models/vendor-products");
const Router = express.Router;
const asyncHandler = require('express-async-handler');
const expressAsyncHandler = asyncHandler.expressAsyncHandler
const productController = require('../controllers/vendor-products')
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
const upload = multer({storage: storage})

//////////////////////////////////////////

const router = Router();

///////////// All products ///////////////

router.get("/products", productController.allProducts);

//////////// Add product ///////////////

router.post("/products/add", upload.array("image_Product",100), productController.addProduct)


//get post by id
router.get('/:id',(req,res) => {
  if(mongoTypes.ObjectId.isValid(req.params.id)) {
    productModel.findById(req.params.id , (err,doc) => {
          if(err) {
              console.log('Internal error',err);
              res.status(400).send('Internal error',err);
          } else {
              res.send(doc);
          }
      })
  } else {
      res.status(400).send('No record found with id :',id);
  }
})

///////////////  Delete Product by id /////////////

router.delete('/:id',(req,res) => {
  if(mongoTypes.ObjectId.isValid(req.params.id)) {
    productModel.findByIdAndRemove(req.params.id , (err,doc) => {
          if(err) {
              console.log('Internal error',err);
              res.status(400).send('Internal error',err);
          } else {
              res.send(doc);
          }
      })
  } else {
      res.status(400).send('No record found with id :',id);
  }
})

//update post 
router.put('/:id',(req,res) => {

  let productModel = {
      title:  req.body.title,
      images: req.body.images,
      quantity: req.body.quantity,
      price: req.body.price,
      dimensions : req.body.dimensions,
      matrial :   req.body.matrial,
      colors :   req.body.colors,
      overview :   req.body.overview,
      category :   req.body.category,
      subcategory :   req.body.subcategory,
  }


  if(mongoTypes.ObjectId.isValid(req.params.id)) {
    productModel.findByIdAndUpdate(req.params.id ,{$set : productModel},{new : true}, (err,doc) => {
          if(err) {
              console.log('Internal error',err);
              res.status(400).send('Internal error',err);
          } else {
              res.send(doc);
          }
      })
  } else {
      res.status(400).send('No record found with id :',id);
  }
})






















// /////////////////////////////////////////////////////////////
////////////// Delete Product ////////////

// router.delete("/products/delete/:id", (req, res) => {
//     const { id } = req.params;
//     console.log(req.params)
//     productModel.deleteOne({ _id: id })
//       .then(() => {
//         console.log("Deleted product successfully!");
//       })
//       .catch((err) => console.log(err));
//   })


  ///////////// Edit Product /////////////
  
  // router.get("/edit/:id", async (req, res) => {
  //   const { id } = req.params;

  //   const getData = await productModel.findOne({ _id: id });
  // })
 //edit details//
  // .post("/edit/:id", (req, res) => {
  //   const { id } = req.params;
  //   const { title, images, quantity, price, dimensions, matrial, category, subcategory, colors, overview} = req.body;

  //   productModel.updateOne({ _id: id }, { title, images, quantity, price, dimensions, matrial, category, subcategory, colors, overview})
  //     .then(() => {
  //       console.log("successfully! updated the product!");
  //     })
  //     .catch((err) => console.log(err));
  // });


module.exports=router;