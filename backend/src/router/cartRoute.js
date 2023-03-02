const express = require('express');
const cartController = require('../controllers/cartController')
const Router = express.Router;
const router = Router();

const {verifyToken} = require('../shared/functions')
/////////////////////////////////////////////////////////////

/////////////////// Add to Cart ////////////////////////////

router.post('/add-to-cart',verifyToken,cartController.addToCart);

////////////////// Update Cart //////////////////////////

router.put('/update-cart',cartController.updateCart)

////////////////// Delete from Cart ///////////////////////

router.delete('delete-from-cart',cartController.deleteFromCart)

////////////////// Empty Cart ////////////////////////////

router.get('empty-cart',cartController.emptyCart)

///////////////////////////////
module.exports = router;