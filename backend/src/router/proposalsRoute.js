const express = require('express');
const { verifyToken } = require('../shared/functions');
const proposalController = require('../controllers/proposalController')
const Router = express.Router;
const router = Router();

router.get('/',verifyToken,proposalController.All)
router.get('/display/:id',verifyToken, proposalController.displayProposal)
router.put('/accept/:id',verifyToken, proposalController.accept)
router.put('/reject/:id',verifyToken, proposalController.reject)
router.get('/vendor/:id',verifyToken, proposalController.displayVendor)

module.exports = router;