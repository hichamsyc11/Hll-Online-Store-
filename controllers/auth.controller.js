const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult;
// 1 - signup
exports.getSignup = (req , res , next)=>{
    res.render('signup',{
        authErr : req.flash('authErr')[0],
        validationErrors : req.flash('validationErrors'),
        isUser : false,
        isAdmin : false,
        pageTitle : 'Sign up'
    })
   
}
// 1 - sign up post
exports.postSignup = (req , res , next)=>{
if(validationResult(req).isEmpty()){

    authModel.createNewUser(req.body.username , req.body.email, req.body.password)
    .then(()=>{
       res.redirect('/login')
    }).catch(err=>{
    req.flash('authErr', err)
    res.redirect('/signup')
      
})
}else{
    req.flash('validationErrors', validationResult(req).array())
    res.redirect('/signup')
}
}
// 2 - Login 
exports.getLogin = (req , res , next)=>{
    res.render('login',{
        authErr : req.flash('authErr')[0] ,
        validationErrors : req.flash('validationErrors'),
        isUser : false,
        isAdmin : false,
        pageTitle : 'Login'
        
    })
}
//2- Login post + session
exports.postLogin = (req , res , next)=>{
    if(validationResult(req).isEmpty()){
        authModel.login(req.body.email, req.body.password)
        .then(result=>{
           req.session.userId = result.id;
           req.session.isAdmin = result.isAdmin
           res.redirect("/")
        }).catch(err=>{
        req.flash('authErr', err) // this err from pw/email incorrect
        res.redirect("/login")
          
    })
    }else{
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/login')
    }
    
    }

    
// 3 - logout 
 exports.logout = (req , res , next )=>{
     req.session.destroy(()=>{
        res.redirect("/")
     })
 }    