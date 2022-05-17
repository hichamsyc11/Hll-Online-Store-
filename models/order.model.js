const mongoose = require('mongoose')
const cartModel = require('./carte.model')
const DB_URl = 'mongodb+srv://hicham_hll:hicham11@cluster0.vcbs3.mongodb.net/online-store?retryWrites=true&w=majority'

const orderSchema = mongoose.Schema({
    name : String,
    address: String ,
    price : Number,
    amount : Number,
    userId: String,
    productId : String,
    timesTamp : {
        type: Date,
        default: Date.now()
    },
    status: {
        type : String,
        default : 'pending'
    },
    
})

const Order = mongoose.model('order' , orderSchema)

// add new order to DB
exports.addNewOrder = data =>{
    return new Promise((resolve, reject) => {
        cartModel.deleteItems(data.cartId)
            .then(() => mongoose.connect(DB_URl, {useNewUrlParser: true }))

            .then(() => {
                let order = new Order(data);
                return order.save();
            })
            .then(() => {
                mongoose.disconnect()
                resolve()
            })
            .catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    });
}

// get order by user
exports.getOrderByUser = userId =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true })
            .then(() => {
                return Order.find({userId : userId}, 
                 {},
                  { sort : {timesTamp: 1}}
                    )
            })
            .then(items => {
                mongoose.disconnect()
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    });
}
// delete post part
exports.cancelOrder = id  =>{

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true })
        
            .then(() => Order.findOneAndDelete(id))
            .then(() => {
                mongoose.disconnect()
                resolve()
            })
            .catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    });
}
// get all order 
exports.getAllOrders = ()=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true }).then(() => {
                return Order.find({}, {}, { sort: { timestamp: 1 }})
            }).then(items => {
                mongoose.disconnect()
                resolve(items)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}
// edit order 
exports.editOrder = (id, newStatus) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URl)
            .then(() => {
                return Order.updateOne({ _id: id }, { status: newStatus });
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};