const router = require('express').Router()
const productController = require('../controllers/product.controller')
router.get('/:id' , productController.getProduct)// this return get product by id
router.get('/' , productController.getProductBySlash)  // this is return first product  

module.exports =  router