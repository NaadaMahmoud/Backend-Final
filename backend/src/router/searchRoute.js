const express=require('express')
const router=express.Router()
const {getProducts} = require('../controllers/search')
router.route('/').get(getProducts)
module.exports=router