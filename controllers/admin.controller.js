const productsModel = require("../models/product");
const ordersModel = require("../models/order.model");
const validationResult = require("express-validator").validationResult;


exports.getAdd = (req , res , next)=>{
    res.render('add-product',{
        validationErrors : req.flash('validationErrors'),
        isUser : true,
        isAdmin : true,
        pageTitle : 'Add Product'
       
    })
}

// add new product in home page post
exports.postAdd = (req , res , next)=> {
    if(validationResult(req).isEmpty()){
        req.body.image = req.file.filename;
        productsModel.addNewProducts(req.body)
        .then(()=>{
            req.flash('added' , true)
            res.redirect('/admin/add')
        })
        .catch(err=>{
            console.log(err)
        })
        }else{
            req.flash("validationErrors", validationResult(req).array());
            res.redirect("/admin/add");
        }
}
// control all orders from Db
exports.getOrders = (req , res , next) =>{
    ordersModel.getAllOrders()
    .then(items=>{
        res.render('manage-order',{
            isUser : true,
            isAdmin : true,
            items : items,
            pageTitle : 'Manage orders'
        })
    })
    .catch(err =>console.log(err))
}
// edit order
exports.editOrder = (req , res , next)=>{
    ordersModel.editOrder(req.body.orderId , req.body.status)
    .then(items=>{
        res.redirect('/admin/order')
    })
    .catch(err=>{
        console.log(err)
    })
}