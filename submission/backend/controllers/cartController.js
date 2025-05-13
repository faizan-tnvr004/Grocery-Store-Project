const { sql, poolPromise } = require('../db');

const addToCart = async (req, res) => {
    console.log("Received request at /api/cart/add");
    console.log("Request Body:", req.body);

    const { customerId, productId, quantity } = req.body;

    // Validate input
    if (!customerId || !productId || quantity == null || quantity <=0) {
        console.log("Missing or invalid fields:", { customerId, productId, quantity });
        return res.status(400).json({ message: "Missing required fields or invalid quantity" });
    }

    try {
        const pool = await poolPromise;
        console.log("Connected to DB");

        const request = pool.request();

        // Call stored procedure to add to cart
        await request
            .input('c_id', sql.Int, customerId)
            .input('p_id', sql.Int, productId)
            .input('qty', sql.Int, quantity)
            .execute('add_to_cart');

        return res.status(200).json({ message: "Cart updated using stored procedure" });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { addToCart };
