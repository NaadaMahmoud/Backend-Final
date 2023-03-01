const express = require('express');
const cartController = require('../controllers/cartController')
const Router = express.Router;
const router = Router();
/////////////////////////////////////////////////////////////

/////////////////// Add to Cart ////////////////////////////

router.get('/add-to-cart',cartController.addToCart);

////////////////// Update Cart //////////////////////////

router.put('/update-cart',cartController.updateCart)

////////////////// Delete from Cart ///////////////////////

router.delete('delete-from-cart',cartController.deleteFromCart)

////////////////// Empty Cart ////////////////////////////

router.get('empty-cart',cartController.emptyCart)