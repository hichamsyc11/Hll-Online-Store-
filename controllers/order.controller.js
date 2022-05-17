const orderModel = require('../models/order.model')
const cartModel = require('../models/carte.model')
const { validationResult } = require('express-validator')
const moment = require('moment')

// first we verify order in cart
exports.getOrderVerify = (req , res , next)=>{
    cartModel.getItemById(req.query.order)
    .then(cartItem=>{
    res.render('verify-order',{
        cart: cartItem,
        isUser : true, 
        isAdmin : req.session.isAdmin,
        validationError: req.flash("validationErrors")[0],
        pageTitle : 'Verify Order'

    })
    })
    .catch(err=>{
        console.log(err)
    })

}

// get order by user and check items
exports.getOrder = (req , res , next)=>{
    orderModel.getOrderByUser(req.session.userId)
    .then(items=> {
        res.render('order',{
            isUser : true,
            isAdmin : req.session.isAdmin,
            items : items,
            pageTitle : 'Orders',
            moment : moment
        })
    })
    .catch(err=>  console.log(err))
}
// this is post order 
exports.postOrder = (req , res , next)=>{
    if(validationResult(req) .isEmpty()){
    orderModel.addNewOrder(req.body)
        .then(()=>{
        res.redirect('/order')
    }).catch(err=>{
        console.log(err)
    })

    }else{
    req.flash("validationErrors", validationResult(req).array());
    res.redirect('/verify-order?order='  + req.body.cartId);
}
}

// cancel order
exports.cancel = (req , res , next)=>{
orderModel.cancelOrder(req.body.orderId)
.then(()=>{
    res.redirect('/order')
})
.catch(err=>{
    console.log(err)
})
}