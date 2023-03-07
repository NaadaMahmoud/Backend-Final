const express=require('express')
const router=express.Router()
const filterController=require('../controllers/search')

const {getProducts, getProductsbyCategory, getLowest, getAll, getProductsbyColor, getAllColors, getbetweenvalues, getbyvendors} = require('../controllers/search')
router.get('/all',filterController.getAll)
//router.get('/cat/:id',filterController.getProductsbyCategory)
router.get('/n/:color',filterController.getProductsbyColor)
router.get('/v/:id',filterController.getProductsbyvendor)
router.get('/name/:name',filterController.getProducts)
router.get('/range/:min/:max',filterController.getbetweenvalues)
router.post('/try',filterController.getProductsbyCategory)

router.get('/allcolors',filterController.getAllColors)
router.get('/vendor',filterController.getbyvendors)
router.get('/lowest',filterController.getLowest)

//router.route('/vendor').get(getbyvendors)

//router.route('/cat').get(getProductsbyCategory)
//router.route('/all').get(getAll)
//router.route('/n/:color').get(getProductsbyColor)
//router.route('/allcolors').get(getAllColors)
//router.route('/range').get(getbetweenvalues)
//router.route('/vendor').get(getbyvendors)

//router.route('/lowest').get(getLowest)

module.exports=router