require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const inventoryRoutes = require('./routes/inventoryAdd');
console.log('inventoryRoutes:', inventoryRoutes);

const cartRoutes = require('./routes/addToCart');
console.log('cartRoutes:', cartRoutes);

const customerRoutes = require('./routes/addCustomer.js'); 
console.log('customerRoutes:', customerRoutes);

const removeFromCartRoutes = require('./routes/remove_from_cart.js');
console.log('removeFromCartRoutes:', removeFromCartRoutes);

const getOneCartRoutes = require('./routes/getOneCart.js');
console.log('getOneCartRoutes:', getOneCartRoutes);

const product = require('./routes/Product.js');
console.log('ProdutAPi:', product);


// Use inventory routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/customer',customerRoutes);
 app.use('/api/cart/remove',removeFromCartRoutes);
app.use('/api/cart',getOneCartRoutes);

app.use('/api/product',product);

app.get('/', (req, res) => {
    res.send('Server is running!');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
