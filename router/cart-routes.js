const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart-controller')
const authentication= require('../middleware/authentication')

router.get('/cart-data',authentication.auth,cartController.getAllCartDetails)
router.get('/get-cart-dataById/:id',authentication.auth,cartController.getCartDetailsById)
router.post('/add-cart-data',authentication.auth,cartController.addcartDetails)
router.post('/add-cart-data/:id',authentication.auth,cartController.addproductToCart)
router.put('/delete-product/:id',authentication.auth,cartController.deleteProductFormCart)
router.put('/update-cart-data/:id',authentication.auth,cartController.UpdatecartdDetails)

module.exports = router;