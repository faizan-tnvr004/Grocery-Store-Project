const {sql, poolPromise} = require('../db');

// Place Order Controller
const placeOrder = async (req, res) => {
  const { customer_id } = req.body;

  if (!customer_id) {
    return res.status(400).json({ error: 'customer_id is required' });
  }
``
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('customer_id', sql.Int, customer_id)
      .execute('place_order');

    const orderId = result.recordset[0]?.order_id;

    res.status(200).json({
      message: 'Order placed successfully',
      order_id: orderId
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

module.exports = { placeOrder };
