const { sql, poolPromise } = require('../db');

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
        
        // Start transaction
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        try {
            // Execute the place_order stored procedure
            const request = new sql.Request(transaction);
            const result = await request
                .input('c_id', sql.Int, customer_id)
                .execute('place_order');

            // Commit transaction if successful
            await transaction.commit();

            res.status(201).json({
                success: true,
                message: 'Order placed successfully',
                order_id: result.recordset[0]?.order_id,
                total_price: result.recordset[0]?.total_price
            });

        } catch (error) {
            // Rollback transaction on error
            await transaction.rollback();
            console.error('Order processing failed:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to place order',
                details: error.message
            });
        }

    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({
            success: false,
            error: 'Database connection error',
            details: error.message
        });
    }
};

module.exports = { placeOrder };