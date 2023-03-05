const express=require('express')
const router=express.Router()
const {getProducts, getProductsbyCategory, getLowest, getAll, getProductsbyColor, getAllColors} = require('../controllers/search')
router.route('/').get(getProducts)
router.route('/cat').get(getProductsbyCategory)
router.route('/all').get(getAll)
router.route('/n/:color').get(getProductsbyColor)
router.route('/allcolors').get(getAllColors)

router.route('/lowest').get(getLowest)

module.exports=router