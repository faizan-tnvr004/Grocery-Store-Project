const express = require('express');
const router = express.Router();
const { RemoveFromCart } = require('../controllers/removeFromCartController');

router.delete('/remove', RemoveFromCart);

module.exports = router;
