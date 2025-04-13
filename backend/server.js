require('dotenv').config();
const express = require('express');
const inventoryRoutes = require('./routes/inventoryAdd');

const app = express();
app.use(express.json());

// Use inventory routes
app.use('/api/inventory', inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
