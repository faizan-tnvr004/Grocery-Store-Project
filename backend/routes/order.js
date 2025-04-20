const express = require('express');
const router = express.Router();
const { 
    placeOrder, 
    updateOrderStatus,
    cancelOrder,
    getOrderDetails,
    getOrderHistory
} = require('../controllers/orderController');

// Order placement
router.post('/place', placeOrder);

// Order status update
router.put('/status', updateOrderStatus);

// Cancel an order
router.post('/cancel', cancelOrder);

// Get specific order details
router.get('/:order_id', getOrderDetails);

// Get order history for customer
router.get('/history', getOrderHistory);

module.exports = router;
