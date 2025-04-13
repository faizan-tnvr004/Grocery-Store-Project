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

        // Check if category exists
        const categoryResult = await pool
            .request()
            .input('categoryName', sql.NVarChar, categoryName)
            .query('SELECT category_id FROM categories WHERE category_name = @categoryName');

        console.log("Category query result:", categoryResult.recordset);

        let categoryId;
        if (categoryResult.recordset.length > 0) {
            categoryId = categoryResult.recordset[0].category_id;
        } else {
            const newCategory = await pool
                .request()
                .input('categoryName', sql.NVarChar, categoryName)
                .query('INSERT INTO categories (category_name) OUTPUT INSERTED.category_id VALUES (@categoryName)');

            console.log("Inserted new category:", newCategory.recordset);
            categoryId = newCategory.recordset[0].category_id;
        }

        // Check if product exists
        const productResult = await pool
            .request()
            .input('productName', sql.NVarChar, productName)
            .query('SELECT product_id FROM products WHERE name = @productName');

        console.log("Product query result:", productResult.recordset);

        let productId;
        if (productResult.recordset.length > 0) {
            productId = productResult.recordset[0].product_id;
        } else {
            const newProduct = await pool
                .request()
                .input('productName', sql.NVarChar, productName)
                .input('categoryId', sql.Int, categoryId)
                .input('price', sql.Decimal(10, 2), price)
                .query('INSERT INTO Products (name, category_id, price,available) OUTPUT INSERTED.product_id VALUES (@productName, @categoryId, @price,1)');

            console.log("Inserted new product:", newProduct.recordset);
            productId = newProduct.recordset[0].product_id;
        }

        // Add inventory item
        const inventoryInsert = await pool
            .request()
            .input('productId', sql.Int, productId)
            .input('stockQuantity', sql.Int, stockQuantity)
            .query('INSERT INTO Inventory (product_id, quantity_changed) VALUES (@productId, @stockQuantity)');

        console.log("Inventory Insert Result:", inventoryInsert);

        res.status(201).json({ message: "Inventory item added successfully." });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};


module.exports = { addInventoryItem };
