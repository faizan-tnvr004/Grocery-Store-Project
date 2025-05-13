const express = require('express');
const router = express.Router();
const { getOneCart } = require('../controllers/OneCartDisplayController.js');

router.get('/details', getOneCart);

module.exports = router;
