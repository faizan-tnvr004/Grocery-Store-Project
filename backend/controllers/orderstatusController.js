const { sql, poolPromise } = require('../db');

// Update Order Status Controller
const updateOrderStatus = async (req, res) => {
  const { order_id, new_status } = req.body;

  if (!order_id || !new_status) {
    return res.status(400).json({ error: 'order_id and new_status are required' });
  }

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('o_id', sql.Int, order_id)
      .input('new_status', sql.VarChar(50), new_status)
      .execute('update_order_status');

    res.status(200).json({
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

module.exports = { updateOrderStatus };
