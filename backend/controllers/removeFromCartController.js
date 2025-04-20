const { sql, poolPromise } = require('../db');

const RemoveFromCart = async (req, res) => {
    console.log("Received request at /api/cart/removeFrom");
    console.log("Request Body:", req.body);

    const { customerId, productId } = req.body;

    // Validate input
    if (!customerId || !productId ) {
        console.log("Missing or invalid fields:", { customerId, productId });
        return res.status(400).json({ message: "Missing required fields " });
    }

    try {
        const pool = await poolPromise;
        console.log("Connected to DB");

        const request = pool.request();

        // Call stored procedure to add to cart
        await request
            .input('c_id', sql.Int, customerId)
            .input('p_id', sql.Int, productId)
           
            .execute('remove_from_cart');

        return res.status(200).json({ message: "removed from cart successfully"});
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


const clearCart = async (req, res) => {
    console.log("Received request at /api/cart/clear");
    console.log("Request Body:", req.body);

    const { customerId } = req.body;

    // Validate input
    if (!customerId) {
        console.log("Missing or invalid fields:", { customerId, productId });
        return res.status(400).json({ message: "Missing required fields " });
    }

    try {
        const pool = await poolPromise;
        console.log("Connected to DB");

        const request = pool.request();

        // Call stored procedure to add to cart
        await request
            .input('customerId', sql.Int, customerId)
           
            .execute('clear_cart');

        return res.status(200).json({ message: "cleared from cart successfully"});
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};







module.exports = { RemoveFromCart, clearCart };
