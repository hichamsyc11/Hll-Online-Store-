const productsModels = require('../models/product')

exports.getHome = (req, res, next)=>{

    let category = req.query.category
    let validCategories = [ 'clothes', 'phones', 'computers']
   
    if(category && validCategories.includes(category)){

        productsModels.getProductByCategory(category).then(products =>{
           res.render('index',{
                products : products,
                isUser : req.session.userId, 
                isAdmin : req.session.isAdmin,
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Home'
            })
        })
    } else{
        productsModels.getAllProducts(category).then(products =>{
            res.render('index',{
                products : products,
                isUser : req.session.userId,
                validationErrors : req.flash('validationErrors')[0],
                isAdmin : req.session.isAdmin,
                pageTitle : 'Home'
                
            })
        })
    }
}