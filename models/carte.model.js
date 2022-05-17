const mongoose = require('mongoose')
const DB_URl = 'mongodb+srv://hicham_hll:hicham11@cluster0.vcbs3.mongodb.net/online-store?retryWrites=true&w=majority'

const cartSchema = mongoose.Schema({
    name : String,
    price : Number,
    amount : Number,
    userId: String,
    productId : String,
    timesTamp : Number
})

const CartItem = mongoose.model('cart' , cartSchema)

exports.addNewItem = data =>{

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true })
        
        .then(() => {
            CartItem.find()

            .then(product=> {
                if(!product) {
                    mongoose.disconnect()
                    reject('this email is used before');
                }
                else{
                    console.log()
                }})

                let item = new CartItem(data);
                return item.save()
            })
            .then(() => {
                mongoose.disconnect()
                resolve()
            })
            .catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}
// get items by user ID

exports.getItemByUserId = userId =>{

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true })
        
        .then(() => {
            return CartItem.find({userId : userId},
                {},
                {sort: {timesTamp:1}})
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

// save post part
exports.editItems = (id , newData) =>{

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true })
        
            .then(() => CartItem.updateOne({ _id:id}, newData))
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
exports.deleteItems = id =>{

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true })
        
            .then(() => CartItem.findOneAndDelete(id))
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
// delete all items

exports.cancelAllCart = () =>{

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true })
        
            .then(() => CartItem.deleteMany({}))
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
// get item by id for verify order
exports.getItemById = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URl)
            .then(() => CartItem.findById(id))
            .then(item => {
                mongoose.disconnect();
                resolve(item);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};
