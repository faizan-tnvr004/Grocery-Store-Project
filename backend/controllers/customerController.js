const { sql, poolPromise } = require('../db');

const addCustomer = async (req, res) => {
    console.log("Received request at /api/customer/add");
    console.log("Request Body:", req.body);

    const { name, phone_number, address } = req.body;

    if (!name || !phone_number || !address) {
        console.log("Missing fields:", { name, phone_number, address });
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const pool = await poolPromise;
        console.log("Connected to DB");

        const result = await pool
            .request()
            .input('c_name', sql.VarChar(255), name)
            .input('c_phone', sql.VarChar(20), phone_number)
            .input('c_address', sql.Text, address)
            .execute('add_customer');

        console.log("Stored Procedure Execution Result:", result);

        res.status(201).json({ message: "Customer added successfully." });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

module.exports = { addCustomer };
