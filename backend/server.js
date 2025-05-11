require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');  // For generating JWT tokens
const app = express();
app.use(express.json());
const cors = require('cors');

// Enable CORS for all requests
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Define customer route for login
app.post('/api/customer/login', async (req, res) => {
    const { customerId } = req.body;

    if (!customerId) {
        return res.status(400).json({ message: "Customer ID is required." });
    }

    try {
        // Assuming you have a function to get user data from the database (e.g., `getCustomerById`)
        const customer = await getCustomerById(customerId);  // Add this logic

        if (!customer) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { customerId: customer.customerId, name: customer.name }, // Payload
            process.env.JWT_SECRET,  // Secret key from .env file
            { expiresIn: '1h' }  // Token expires in 1 hour
        );

        res.status(200).json({
            message: "Login successful.",
            token,  // Send token to the client
            customerId: customer.customerId,
            name: customer.name,
            address: customer.address
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Function to retrieve customer data from the database
async function getCustomerById(customerId) {
    // Assuming you have a database query to get the customer by ID
    // You can replace this with actual DB query logic
    const customers = [
        { customerId: 1, name: "John Doe", address: "123 Street" },
        { customerId: 2, name: "Jane Smith", address: "456 Avenue" },
    ];
    
    return customers.find(customer => customer.customerId === parseInt(customerId));
}

// Other routes
const inventoryRoutes = require('./routes/inventoryAdd');
console.log('inventoryRoutes:', inventoryRoutes);

const cartRoutes = require('./routes/addToCart');
console.log('cartRoutes:', cartRoutes);

const customerRoutes = require('./routes/allCustomer'); 
console.log('customerRoutes:', customerRoutes);

const removeFromCartRoutes = require('./routes/remove_from_cart.js');
console.log('removeFromCartRoutes:', removeFromCartRoutes);

const getOneCartRoutes = require('./routes/getOneCart.js');
console.log('getOneCartRoutes:', getOneCartRoutes);

const product = require('./routes/Product.js');
console.log('ProdutAPi:', product);

const orderRoutes = require('./routes/order');
console.log('orderRoutes:',orderRoutes);

const getinventoryRoutes = require('./routes/inventory');
console.log('inventoryRooutes:',inventoryRoutes);

const getCategoryRoutes = require('./routes/displayCategory.js');
console.log('getCategoryRoutes:', getCategoryRoutes);

// Use inventory routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/customer',customerRoutes);
app.use('/api/cart',removeFromCartRoutes);
app.use('/api/cart',getOneCartRoutes);
//order api
app.use('/api/orders', orderRoutes); 

app.use('/api/inventory',getinventoryRoutes);

app.use('/api/product',product);
app.use('/api/show',getCategoryRoutes); 




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
