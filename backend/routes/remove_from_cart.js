const express = require('express');
const router = express.Router();
const { RemoveFromCart, clearCart } = require('../controllers/removeFromCartController');

router.delete('/remove', RemoveFromCart);
router.delete('/clear', clearCart);


module.exports = router;
