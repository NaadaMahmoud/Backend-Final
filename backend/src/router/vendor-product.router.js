const express = require('express');
const productModel = require("../models/vendor-products");
const Router = express.Router;
const productController = require('../controllers/vendor-products')
const router = Router();
const mongoTypes = require('mongoose').Types;
const {verifyToken} = require('../shared/functions')

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

router.post("/products/add", verifyToken, upload.array("image_Product",100), productController.addProduct)

//////////// Get Vendor products ///////////////

router.get("/products/byId", verifyToken, upload.array("image_Product",100), productController.getById)


////////////// Delete Product ////////////

router.delete("/products/delete/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    productModel.findByIdAndDelete( id)
      .then(() => {
        console.log("Deleted product successfully!");
      })
      .catch((err) => console.log(err));
  })








//////////////////////////////////////////


// update Product 
// router.put("/products/edit/:id", upload.array("image_Product",100), (req,res) => {

//   let pathLink = "http://localhost:5000/"
//         let arr=[];
//         for(const a of req.files){
//             arr.push(pathLink+a.path.split('\\')[1]);
//             // console.log(a.path.split('\\')[1]);
//         }

//   let productModel = {
//       title:  req.body.title,
//       images: arr,
//       quantity: req.body.quantity,
//       price: req.body.price,
//       dimensions : req.body.dimensions,
//       matrial :   req.body.matrial,
//       colors :   req.body.colors,
//       overview :   req.body.overview,
//       category :   req.body.category,
//       subcategory :   req.body.subcategory,
//   }


//   if(mongoTypes.ObjectId.isValid(req.params.id)) {
//     productModel.findByIdAndUpdate(req.params.id ,{$set : productModel},{new : true}, (err,doc) => {
//           if(err) {
//               console.log('Internal error',err);
//               res.status(400).send('Internal error',err);
//           } else {
//               res.send(doc);
//           }
//       })
//   } else {
//       res.status(400).send('No record found with id :',id);
//   }
// })





////////////////update Product ///////////////
router.put("/products/edit/:id", upload.array("image_Product",100), (req,res) => {

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



//get Product by id******Doha*******

router.get("/products/productbyId/:id", async (req, res) => {
  const { id } = req.params;
})
//////////////////update Product ///////////////
// router.put('/:id',(req,res) => {

//   let productModel = {
//       title:  req.body.title,
//       images: req.body.images,
//       quantity: req.body.quantity,
//       price: req.body.price,
//       dimensions : req.body.dimensions,
//       matrial :   req.body.matrial,
//       colors :   req.body.colors,
//       overview :   req.body.overview,
//       category :   req.body.category,
//       subcategory :   req.body.subcategory,
//   }


//   if(mongoTypes.ObjectId.isValid(req.params.id)) {
//     productModel.findByIdAndUpdate(req.params.id ,{$set : productModel},{new : true}, (err,doc) => {
//           if(err) {
//               console.log('Internal error',err);
//               res.status(400).send('Internal error',err);
//           } else {
//               res.send(doc);
//           }
//       })
//   } else {
//       res.status(400).send('No record found with id :',id);
//   }
// })


module.exports=router;