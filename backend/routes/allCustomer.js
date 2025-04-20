const express = require('express');
const router = express.Router();
const { addCustomer, getCustomer, viewCustomers } = require('../controllers/customerController');

// Sample route
router.post('/add', addCustomer);


router.get('/get/:customerId', getCustomer);

router.get('/view', viewCustomers);
module.exports = router;
