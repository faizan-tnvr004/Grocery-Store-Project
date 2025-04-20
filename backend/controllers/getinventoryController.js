const { sql, poolPromise } = require('../db');

const getInventoryStatus = async (req, res) => {
    const { product_id } = req.query; // Optional product_id filter

    try {
        const pool = await poolPromise;
        let result;

        if (product_id) {
            // Get specific product inventory using your procedure
            result = await pool.request()
                .input('product_id', sql.Int, product_id)
                .execute('inventoryStatus');
        } else {
            // Get all inventory using your view
            result = await pool.request()
                .query('SELECT * FROM inventory_status');
        }

        res.status(200).json({
            success: true,
            data: result.recordset,
            message: product_id 
                ? 'Inventory status retrieved for product' 
                : 'Full inventory status retrieved'
        });

    } catch (error) {
        console.error('Inventory check failed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get inventory status',
            details: error.message
        });
    }
};

module.exports = { getInventoryStatus };