const cartModel = require('../models/carte.model')
const validationResult = require("express-validator").validationResult;

//1-b- this is get card part by user id

exports.getCard = (req, res, next) => {
    cartModel
        .getItemByUserId(req.session.userId)
        .then(items => {
            res.render("cart", {
                items: items,
                isUser: true,
                isAdmin : req.session.isAdmin,
                saveMsg : req.flash('saveMsg' )[0],
                validationErrors : req.flash('validationErrors')[0],
                pageTitle : 'Cart'
            });
        })
        .catch(err => {
            console.log(err)
        });
};


//1-A- this is post card for send data to card
exports.postCard = (req, res , next)=>{
if(validationResult(req).isEmpty()){
    cartModel.addNewItem({
        name: req.body.name,
        price : req.body.price,
        amount : req.body.amount,
        productId :req.body.productId,
        userId : req.session.userId,
        timesTamp : Date.now()
    }).then(()=>{
        res.redirect('/cart')
    }).catch(err=>{
        console.log(err)
    }) 
} else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect(req.body.redirectTo);
}

}
// save post part
exports.postSave = (req , res , next)=>{
    if(validationResult(req).isEmpty()){
       cartModel
        .editItems(req.body.cartId , {
            amount : req.body.amount,
            timesTamp : Date.now()
       }) .then(()=>{
           req.flash('saveMsg' , true)
           res.redirect('/cart')
       }).catch(err=>{
        console.log(err)
       })

    }else{
        req.flash("validationErrors", validationResult(req).array());
        res.redirect('/cart');
    }
}

// delete post part
exports.postDelete = (req , res , next)=>{
cartModel.deleteItems(req.body.cartId)
.then(()=>{
    res.redirect('/cart')
}).catch(err=>{
    console.log(err)
})
}
// cancel all part
exports.postCancelAll = (req , res , next)=>{
    cartModel.cancelAllCart (req.body.cartId)
    .then(()=>{
        res.redirect('/cart')
    }).catch(err=>{
        console.log(err)
    })
}