const express = require('express');
const jobsController = require('../controllers/jobsController')
const Router = express.Router;
const router = Router();

const {verifyToken} = require('../shared/functions')


////////////// Gett All Jops //////////////////

router.get('/',jobsController.getAll)

//////////////// category filter ///////////////

router.get('/catid/:id',jobsController.categoryFilter)
///////////////////////////////

router.get('/vendorJobs',verifyToken, jobsController.vendorJobs)

module.exports = router;