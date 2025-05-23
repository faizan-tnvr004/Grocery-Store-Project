const {sql, poolPromise} = require('../db');

const getOneCart = async (req, res) => {
console.log ("received request at /api/cart/details")
console.log("request query: " , req.query)

const {customerId} = req.query;

// Validate input
if (!customerId ) {
    console.log("Missing or invalid fields:", { customerId });
    return res.status(400).json({ message: "Missing required fields" });


}
try{
const pool = await poolPromise;
console.log("connected to DB")

const request = await pool.request();
request.input('customerId', sql.Int, customerId);


const result = await request.execute('specificCartDetails');
return res.status(200).json(result.recordset);

}
catch

(error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
}

};
module.exports = { getOneCart };