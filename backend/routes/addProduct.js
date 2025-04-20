const express = require('express');
const router = express.Router();
const { addProduct } = require('../controllers/addProductController.js');

// Sample route
router.post('/add', addProduct);

module.exports = router;
