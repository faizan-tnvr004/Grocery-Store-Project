const { sql, poolPromise } = require('../db');

// PLACE ORDER
const placeOrder = async (req, res) => {
    const { customer_id } = req.body;

    if (!customer_id) {
        return res.status(400).json({ 
            success: false,
            error: 'Customer ID is required' 
        });
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('c_id', sql.Int, customer_id)
            .execute('place_order');

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order_id: result.recordset[0]?.order_id,
            total_price: result.recordset[0]?.total_price
        });

    } catch (error) {
        console.error('Order placement failed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to place order',
            details: error.message
        });
    }
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
    const { order_id, new_status } = req.body;

    if (!order_id || !new_status) {
        return res.status(400).json({ 
            success: false,
            error: 'order_id and new_status are required' 
        });
    }

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('o_id', sql.Int, order_id)
            .input('new_status', sql.VarChar(50), new_status)
            .execute('update_order_status');

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order_id,
            new_status
        });

    } catch (error) {
        console.error('Status update failed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update order status',
            details: error.message
        });
    }
};

// CANCEL ORDER
const cancelOrder = async (req, res) => {
    const { order_id } = req.body;

    if (!order_id) {
        return res.status(400).json({ 
            success: false,
            error: 'order_id is required' 
        });
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('order_id', sql.Int, order_id)
            .execute('cancel_order');

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            order_id,
            restored_items: result.recordset
        });

    } catch (error) {
        console.error('Order cancellation failed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to cancel order',
            details: error.message
        });
    }
};

// GET ORDER DETAILS
const getOrderDetails = async (req, res) => {
    const { order_id } = req.params;

    if (!order_id) {
        return res.status(400).json({ 
            success: false,
            error: 'Order ID is required' 
        });
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('order_id', sql.Int, order_id)
            .execute('get_order_details');

        if (!result.recordsets[0].length) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                order: result.recordsets[0][0],
                items: result.recordsets[1]
            },
            message: 'Order details retrieved'
        });

    } catch (error) {
        console.error('Fetch order failed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get order details',
            details: error.message
        });
    }
};

// GET ORDER HISTORY
const getOrderHistory = async (req, res) => {
    const { customer_id } = req.query;

    if (!customer_id) {
        return res.status(400).json({ 
            success: false,
            error: 'customer_id is required' 
        });
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('customer_id', sql.Int, customer_id)
            .execute('get_order_history');

        res.status(200).json({
            success: true,
            data: result.recordsets[0],
            message: 'Order history retrieved'
        });

    } catch (error) {
        console.error('Fetch history failed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get order history',
            details: error.message
        });
    }
};

module.exports = { 
    placeOrder, 
    updateOrderStatus, 
    cancelOrder,
    getOrderDetails, 
    getOrderHistory 
};