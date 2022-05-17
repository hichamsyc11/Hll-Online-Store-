const productId = require('../models/product')

exports.getProductBySlash = (req,res,next)=>{
productId.getFirstProduct().then(product=>{
  res.render('product',{
    product : product,
    isUser: req.session.userId,
    isAdmin : req.session.isAdmin,
    pageTitle : 'Detail'
  })
})
}


exports.getProduct = (req,res,next)=>{

    let id = req.params.id
    productId.getProductById(id).then(product =>{
      res.render('product', {
          product : product,
          isUser: req.session.userId,
          isAdmin : req.session.isAdmin,
          pageTitle : 'Detail'
      })
    })
}