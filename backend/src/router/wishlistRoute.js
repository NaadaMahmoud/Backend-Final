const express = require('express');
const wishlistController = require('../controllers/wishlistController')
const Router = express.Router;
const router = Router();

const {verifyToken} = require('../shared/functions')
/////////////////////////////////////////////////////////////

////////////////// Get Cart Items ////////////////////////////

router.get('/',verifyToken,wishlistController.getAll)

/////////////////// Add to Cart ////////////////////////////

router.post('/add',verifyToken,wishlistController.addToList);

////////////////// Delete from Cart ///////////////////////

router.delete('/remove/:id',verifyToken,wishlistController.removeFromList)

///////////////////////////////
module.exports = router;