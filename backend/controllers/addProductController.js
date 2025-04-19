const { sql, poolPromise } = require('../db');

const addProduct = async (req, res) => {
    console.log("Received request at /api/addProduct");
    console.log("Request Body:", req.body);

    const { categoryName, productName, price, stockQuantity } = req.body;

    // Validate input
    if (!categoryName || !productName || price == null || stockQuantity == null) {
        console.log("Missing or invalid fields:", { categoryName, productName, price, stockQuantity });
        return res.status(400).json({ message: "Missing required fields or invalid quantity" });
    }

    try {
        const pool = await poolPromise;

       
        console.log(" Connected to DB through poolpromise");

        const request = pool.request();

        await request
            .input('categoryName', sql.NVarChar(100), categoryName)
            .input('productName', sql.NVarChar(100), productName)
            .input('price', sql.Decimal(10, 2), price)
            .input('stockQuantity', sql.Int, stockQuantity)
            .execute('add_product');

        return res.status(200).json({ message: "Product added successfully" });

    } catch (error) {
        console.error(" Database Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { addProduct };
