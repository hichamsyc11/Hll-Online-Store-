const router = require('express').Router()
const bodyParser = require('body-parser');
const check = require('express-validator').check
const authController = require('../controllers/auth.controller')
const authGuard = require('./guards/auth.guard')

router.get("/signup",authGuard.notAuth , authController.getSignup);

router.post( 
    "/signup",authGuard.notAuth ,
    bodyParser.urlencoded({ extended: true}),
    check('username').not().isEmpty().withMessage('write your Username') ,
    check('email').not().isEmpty().withMessage(' write your email').isEmail().withMessage("correct your email "), 
    check('password').not().isEmpty().withMessage(' write your password').isLength({ min :8 }).withMessage('your password must be min 8'),
    check('confirmPassword').custom((value , {req})=>{
        if(value === req.body.password){
            return true
        }else throw 'password is not a same'
    }) ,
    authController.postSignup
);


router.get("/login",authGuard.notAuth , authController.getLogin);
router.post(
    '/login',authGuard.notAuth ,
    bodyParser.urlencoded({ extended: true }),
    check('email').not().isEmpty().withMessage(' write your email').isEmail().withMessage(" email incorrect"), 
    check('password').not().isEmpty().withMessage(' write your password').isLength({ min :8 }).withMessage('password incorrect'),
    authController.postLogin
)

router.all('/logout',authGuard.isAuth , authController.logout)
module.exports =  router