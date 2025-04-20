const express = require('express');
const router = express.Router();
const { addCustomer, getCustomer } = require('../controllers/customerController');

// Sample route
router.post('/add', addCustomer);


router.get('/get/:customerId', getCustomer);
module.exports = router;
