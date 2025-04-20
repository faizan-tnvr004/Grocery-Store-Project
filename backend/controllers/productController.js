const { sql, poolPromise } = require('../db');

// Add Product
const addProduct = async (req, res) => {
    console.log("Received request at /api/product/add");
    console.log("Request Body:", req.body);

    const { categoryName, productName, price, stockQuantity } = req.body;

    if (!categoryName || !productName || price == null || stockQuantity == null) {
        return res.status(400).json({ message: "Missing required fields or invalid quantity" });
    }

    try {
        const pool = await poolPromise;
        const request = pool.request();

        await request
            .input('categoryName', sql.NVarChar(100), categoryName)
            .input('productName', sql.NVarChar(100), productName)
            .input('price', sql.Decimal(10, 2), price)
            .input('stockQuantity', sql.Int, stockQuantity)
            .execute('add_product');

        return res.status(200).json({ message: "Product added successfully" });

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    console.log("Received request at /api/product/update");
    console.log("Request Body:", req.body);

    const { productId, newName, newPrice, newStockQuantity, available } = req.body;

    if (
        productId == null ||
        !newName ||
        newPrice == null ||
        newStockQuantity == null ||
        available == null
    ) {
        return res.status(400).json({ message: "Missing or invalid fields" });
    }

    try {
        const pool = await poolPromise;
        const request = pool.request();

        await request
            .input('productId', sql.Int, productId)
            .input('newName', sql.NVarChar(100), newName)
            .input('newPrice', sql.Decimal(10, 2), newPrice)
            .input('newStockQuantity', sql.Int, newStockQuantity)
            .input('available', sql.Bit, available)
            .execute('update_product');

        return res.status(200).json({ message: "Product updated successfully" });

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    console.log("Received request at /api/product/delete");
    console.log("Request Params:", req.params);

    const { productId } = req.params;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        const pool = await poolPromise;
        const request = pool.request();

        const result = await request
            .input('productId', sql.Int, productId)
            .execute('delete_product');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//retrieve a product
const retrieveProduct = async (req, res) => {
console.log("Received request at /api/product/retrieve");
console.log("Request Params:", req.params);

const { productId } = req.params;

if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
}

try {
    const pool = await poolPromise;
    const request = await pool.request();

    
        request.input('productId', sql.Int, productId);
        const result = await request.execute('get_product_by_id');
       
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Product not found" });
    }
    else{
        return res.status(200).json(result.recordset);
    }

   

} catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
}
}
;


module.exports = { addProduct, updateProduct, deleteProduct, retrieveProduct };
