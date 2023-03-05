const express=require('express')
const router=express.Router()
const {getProducts, getProductsbyCategory, getLowest, getAll, getProductsbyColor, getAllColors, getbetweenvalues, getbyvendors} = require('../controllers/search')
router.route('/').get(getProducts)
router.route('/cat').get(getProductsbyCategory)
router.route('/all').get(getAll)
router.route('/n/:color').get(getProductsbyColor)
router.route('/allcolors').get(getAllColors)
router.route('/range').get(getbetweenvalues)
//router.route('/vendor').get(getbyvendors)

router.route('/lowest').get(getLowest)

module.exports=router