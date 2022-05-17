const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')

const homeRouter = require('./routes/home-router')
const productRoute = require('./routes/product.route')
const authRouter = require('./routes/auth.route')
const cartRouter = require('./routes/carte.route')
const orderRouter = require('./routes/order.route')
const adminRouter = require('./routes/admin.route')

app.use(express.static(path.join(__dirname , 'assets')))
app.use(express.static(path.join(__dirname , 'images')))

app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb+srv://hicham_hll:hicham11@cluster0.vcbs3.mongodb.net/online-store?retryWrites=true&w=majority',
    collection: 'sessions'
})

app.use(
    session({
        secret: "this is my secret secret to hash express sessions ......",
        resave: true,
        saveUninitialized: false,
        store: STORE
    })
);

app.set('view engine' , 'ejs')
app.set('views' , 'views')

app.use('/' , homeRouter)
app.use('/' , authRouter)
app.use('/product', productRoute)
app.use('/cart', cartRouter)
app.use('/' , orderRouter)
app.use('/admin' , adminRouter)

// this is for any errors
app.use('/error', (req , res , next)=>{
    res.status(500)
    res.render('error.ejs',{
        isUser : req.session.userId,
        isAdmin : req.session.isAdmin,
        pageTitle : 'Error'
    })
    
})
// only admin
app.use('/not-admin', (req , res , next)=>{
    res.status(403)
    res.render('error.ejs',{
        isUser : req.session.userId,
        isAdmin : false,
        pageTitle : 'Not Allowed'
    })
    
})

app.use((error, req , res , next)=>{
    res.redirect('/error')
})
app.use((req, res, next) => {
    res.status(404);
    res.render("not-found", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Page Not Found"
    });
});

const port = process.env.PORT || 3000;




app.listen(port,(err)=>{
    console.log('server is listen on port'+ port)
})