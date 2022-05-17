const router = require('express').Router()
const bodyParser = require('body-parser')

const authGuard = require('./guards/auth.guard')
const check = require('express-validator').check
const cartController = require('../controllers/carte.controller')

router.get('/', authGuard.isAuth , cartController.getCard)

router.post('/',authGuard.isAuth,
bodyParser.urlencoded({extended:true}),
    check('amount')
        .not().isEmpty()
        .withMessage('amount is required')
        .isInt({min : 1})
        .withMessage('amount must be greater than 0'),
        cartController.postCard
)

// this save cart part
router.post('/save',authGuard.isAuth,
bodyParser.urlencoded({extended:true}),
    check('amount')
        .not().isEmpty()
        .withMessage('amount is required')
        .isInt({min : 1})
        .withMessage('amount must be greater than 0 .'),
        cartController.postSave
)
// this delete cart part
router.post('/delete' ,
    authGuard.isAuth,
    bodyParser.urlencoded({extended:true}),
    cartController.postDelete
)
// cancel all items in card
router.post('/deleteAll' ,
    authGuard.isAuth,
    bodyParser.urlencoded({extended:true}),
    cartController.postCancelAll
)
module.exports = router;