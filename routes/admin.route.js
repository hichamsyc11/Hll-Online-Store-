const router = require('express').Router()
const check = require('express-validator').check
const bodyParser = require('body-parser')
const multer = require('multer')
const adminController = require('../controllers/admin.controller')
const adminGuard = require('./guards/admin.guard')



router.get('/add' , adminGuard.getAdmin, adminController.getAdd)

router.post('/add' , adminGuard.getAdmin ,
multer({
storage : multer.diskStorage({
    destination : (req , file , cb)=>{
        cb(null , 'images')
    },
    filename : (req , file , cb)=>{
        cb(null , Date.now() + file.originalname)
    }
})

}).single('image'),
check("name")
        .not()
        .isEmpty()
        .withMessage("name is required"),
    check("price")
        .not()
        .isEmpty()
        .withMessage("price is required")
        .isFloat({ min: 0.0000000009 })
        .withMessage("price must be greater than 0"),
    check("description")
        .not()
        .isEmpty()
        .withMessage("description is required"),
    check("category")
        .not()
        .isEmpty()
        .withMessage("category is required"),

check('image').custom((value , {req})=>{
    if(req.file) return true;
    else throw 'image is required '
}),

bodyParser.urlencoded({extended : true}),
adminController.postAdd
)

// routing manage orders
router.get('/order' , adminGuard.getAdmin , adminController.getOrders)

router.post('/order', adminGuard.getAdmin ,
bodyParser.urlencoded({extended: true}),
adminController.editOrder
)




module.exports = router ; 