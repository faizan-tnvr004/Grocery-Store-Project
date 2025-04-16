require('dotenv').config();
const express = require('express');
const inventoryRoutes = require('./routes/inventoryAdd');

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Use inventory routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/cart',require('./routes/addToCart'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
