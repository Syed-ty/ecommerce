const express = require('express');
const router = express.Router();
const productController = require('../controller/product-controller')
const authentication= require('../middleware/authentication')

router.get('/get-product-data',authentication.auth,productController.getAllproductDetails)
router.get('/get-product-dataById/:id',authentication.auth,productController.getProductDetailsById)

router.post('/add-product-data',authentication.auth,productController.addproductDetails)
router.put('/update-product-data/:id',authentication.auth,productController.UpdateproductdDetails)
 router.delete('/delete-data/:id',authentication.auth,productController.DeleteproductdDetails)

module.exports = router;