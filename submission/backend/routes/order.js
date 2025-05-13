const express = require('express');
const router = express.Router();
const { 
    placeOrder, 
    updateOrderStatus,
    cancelOrder,
    getOrderDetails,
    getOrderHistory,
    viewAllOrders 
} = require('../controllers/orderController');

// Order placement
router.post('/place', placeOrder);

// Order status update
router.put('/status', updateOrderStatus);

// Cancel an order
router.post('/cancel', cancelOrder);

// Get order history for customer
router.get('/history', getOrderHistory);

// Get specific order details
router.get('/details/:order_id', getOrderDetails);

// View all orders
router.get('/all', viewAllOrders); // New route for viewing all orders

module.exports = router;
