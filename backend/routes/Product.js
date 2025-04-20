const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct, retrieveProduct } = require('../controllers/productController');

// Route to add a product
router.post('/add', addProduct);

// Route to update a product
router.post('/update', updateProduct);

// Route to delete a product
router.delete('/delete/:productId', deleteProduct);

// Route to retrieve a product by ID
router.get('/retrieve/:productId', retrieveProduct);

module.exports = router;
