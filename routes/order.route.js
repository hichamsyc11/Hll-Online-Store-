const router = require('express').Router()
const bodyParser = require('body-parser')
const orderController = require('../controllers/order.controller')
const check = require("express-validator").check;
const authGuard = require('./guards/auth.guard')


router.get('/verify-order' ,authGuard.isAuth , orderController.getOrderVerify)
router.get('/order' , authGuard.isAuth, orderController.getOrder)


router.post('/order' , authGuard.isAuth , 
bodyParser.urlencoded({extended:true}),
    check('address')
        .not().isEmpty()
        .withMessage(' please write your address'),
        
        orderController.postOrder
)

//cancel order part
router.post(
    "/order/cancel",
    authGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    orderController.cancel
);

module.exports = router;