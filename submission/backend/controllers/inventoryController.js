const { sql, poolPromise } = require('../db');

const addInventoryItem = async (req, res) => {
    console.log("Received request at /api/inventory/add");
    console.log("Request Body:", req.body);

    const { categoryName, productName, stockQuantity, price } = req.body;

    if (!categoryName || !productName || stockQuantity == null || price == null) {
        console.log("Missing fields:", { categoryName, productName, stockQuantity, price });
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const pool = await poolPromise;
        console.log("Connected to DB");

        const result = await pool
            .request()
            .input('categoryName', sql.NVarChar(100), categoryName)
            .input('productName', sql.NVarChar(100), productName)
            .input('stockQuantity', sql.Int, stockQuantity)
            .input('price', sql.Decimal(10, 2), price)
            .execute('add_inventory_item');

        console.log("Stored procedure executed:", result);

        res.status(201).json({ message: "Inventory item added successfully via stored procedure." });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

module.exports = { addInventoryItem };
