const { sql, poolPromise } = require('../db');

const addToCart = async (req, res) => {
    console.log("Received request at /api/cart/add");
    console.log("Request Body:", req.body);

    const { customerId, productId, quantity } = req.body;

    // Check for missing or invalid fields
    if (!customerId || !productId || quantity == null || quantity <= 0) {
        console.log("Missing or invalid fields:", { customerId, productId, quantity });
        return res.status(400).json({ message: "Missing required fields or invalid quantity" });
    }

    try {
        const pool = await poolPromise;
        console.log("Connected to DB");

        // Check if customer exists
        const customerResult = await pool
            .request()
            .input('customerId', sql.Int, customerId)
            .query('SELECT customer_id FROM Customers WHERE customer_id = @customerId');
           
           
        console.log("Executed Query: SELECT customer_id FROM Customers WHERE customer_id =", customerId);
        console.log("Customer query result:", customerResult.recordset);

        if (customerResult.recordset.length === 0) {
            return res.status(400).json({ message: "Customer not found" });
        }

        // Check if product exists and get the price
        const productResult = await pool
            .request()
            .input('productId', sql.Int, productId)
            .query('SELECT product_id, price FROM Products WHERE product_id = @productId');

        console.log("Product query result:", productResult.recordset);

        if (productResult.recordset.length === 0) {
            return res.status(400).json({ message: "Product not found" });
        }

        const productPrice = productResult.recordset[0].price;
        const totalPrice = productPrice * quantity;

        // Check if the product is already in the customer's cart
        const cartItemResult = await pool
            .request()
            .input('customerId', sql.Int, customerId)
            .input('productId', sql.Int, productId)
            .query('SELECT cart_id FROM cart_details WHERE customer_id = @customerId AND product_id = @productId');

        console.log("Cart query result:", cartItemResult.recordset);

        if (cartItemResult.recordset.length > 0) {
            // If the product is already in the cart, update the quantity and total price
            await pool
                .request()
                .input('customerId', sql.Int, customerId)
                .input('productId', sql.Int, productId)
                .input('quantity', sql.Int, quantity)
                .input('totalPrice', sql.Decimal(10, 2), totalPrice)
                .query(`
                    UPDATE cart_details
                    SET quantity = quantity + @quantity,
                        total_price = total_price + @totalPrice
                    WHERE customer_id = @customerId AND product_id = @productId
                `);

            return res.status(200).json({ message: "Cart updated successfully" });
        } else {
            // If the product is not in the cart, insert a new cart item
            await pool
                .request()
                .input('customerId', sql.Int, customerId)
                .input('productId', sql.Int, productId)
                .input('quantity', sql.Int, quantity)
                .input('price', sql.Decimal(10, 2), productPrice)
                .input('totalPrice', sql.Decimal(10, 2), totalPrice)
                .query(`
                    INSERT INTO cart_details (customer_id, product_id, quantity, price, total_price)
                    VALUES (@customerId, @productId, @quantity, @price, @totalPrice)
                `);

            return res.status(201).json({ message: "Product added to cart successfully" });
        }

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { addToCart };
