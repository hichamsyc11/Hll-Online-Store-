const mongoose = require('mongoose')
const DB_URl = 'mongodb+srv://hicham_hll:hicham11@cluster0.vcbs3.mongodb.net/online-store?retryWrites=true&w=majority'

const productSchema = mongoose.Schema({
    name : String,
    image : String,
    price : Number,
    description : String,
    category : String
})

const Product = mongoose.model('product' , productSchema)

// add new DAta from admin
exports.addNewProducts = data =>{
    return new Promise ((resolve , reject)=>{
        mongoose.connect(DB_URl, {useNewUrlParser: true})
        .then(()=>{
            let newProduct = new Product(data)
            return newProduct.save()
        }).then(products=>{
            resolve(products)
            mongoose.disconnect()
        }).catch(err=>{
            reject(err)
            mongoose.disconnect()
        })

    })
}

// get all products
exports.getAllProducts = ()=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true }).then(() => {
                return Product.find({})
            }).then(products => {
                mongoose.disconnect()
                resolve(products)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

// get product by Category
exports.getProductByCategory = (category)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true }).then(() => {
                return Product.find({ category : category })
            }).then(products => {
                mongoose.disconnect()
                resolve(products)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })

}


exports.getProductById = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true }).then(() => {
                return Product.findById(id);
            })
            .then(products => {
                mongoose.disconnect()
                resolve(products)
            })
            .catch(err => reject(err));
    })

}

exports.getFirstProduct = ()=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URl, {useNewUrlParser: true }).then(() => {
                return Product.findOne({});
            })
            .then(products => {
                mongoose.disconnect()
                resolve(products)
            })
            .catch(err => reject(err));
    })
}