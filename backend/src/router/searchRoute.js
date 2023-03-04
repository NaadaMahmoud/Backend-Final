const express=require('express')
const router=express.Router()
const {getProducts, getProductsbyCategory, getLowest} = require('../controllers/search')
router.route('/').get(getProducts)
router.route('/cat').get(getProductsbyCategory)
router.route('/lowest').get(getLowest)

module.exports=router