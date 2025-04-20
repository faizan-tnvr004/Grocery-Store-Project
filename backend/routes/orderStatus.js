const express = require('express');
const router = express.Router();
const { placeOrder, updateOrderStatus } = require('../controllers/orderstatusController');

router.post('/place', placeOrder);
router.put('/update-status', updateOrderStatus);  // new route

module.exports = router;
