
const express = require('express');
const router = express.Router();
const { getProductsByCategory } = require('../controllers/getCategory.js');

router.get('/category/:categoryName', getProductsByCategory);

module.exports = router;
