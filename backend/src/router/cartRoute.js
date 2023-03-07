const express = require('express');
const cartController = require('../controllers/cartController')
const Router = express.Router;
const router = Router();

const {verifyToken} = require('../shared/functions')
/////////////////////////////////////////////////////////////

////////////////// Get Cart Items ////////////////////////////

router.get('/',verifyToken,cartController.getAll)

/////////////////// Add to Cart ////////////////////////////

router.post('/add-to-cart',verifyToken,cartController.addToCart);

////////////////// Update Cart //////////////////////////

router.put('/update-cart/:id',verifyToken,cartController.updateCart)

////////////////// Delete from Cart ///////////////////////

router.delete('/delete-from-cart/:id',verifyToken,cartController.deleteFromCart)

////////////////// Empty Cart ////////////////////////////

router.get('/empty-cart',verifyToken,cartController.emptyCart)

///////////////////////////////
module.exports = router;