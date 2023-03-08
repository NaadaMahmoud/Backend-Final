const express = require('express');
const clientOrdersController = require('../controllers/clientOrdersController')
const Router = express.Router;
const router = Router();

const {verifyToken} = require('../shared/functions')
/////////////////////////////////////////////////////////////

////////////////// Get Cart Items ////////////////////////////

router.get('/',verifyToken,clientOrdersController.getAll)

///////////////////////////////
module.exports = router;