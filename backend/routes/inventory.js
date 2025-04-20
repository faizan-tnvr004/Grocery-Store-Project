const express = require('express');
const router = express.Router();
const { getInventoryStatus } = require('../controllers/getinventoryController');

router.get('/status', getInventoryStatus);

module.exports = router;