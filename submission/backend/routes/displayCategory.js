
const express = require('express');
const router = express.Router();
const { getProductsByCategory } = require('../controllers/getCategory.js');
const { getAllCategories } = require('../controllers/getCategory.js');

router.get('/category/:categoryName', getProductsByCategory);

router.get('/categories', getAllCategories);
module.exports = router;
