const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const DB_URl = 'mongodb+srv://hicham_hll:hicham11@cluster0.vcbs3.mongodb.net/online-store?retryWrites=true&w=majority'

const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    isAdmin : {
        type : Boolean,
        default : false
    }
})

const User = mongoose.model('user' , userSchema)

// Sign Up
exports.createNewUser = (username , email , password)=> {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URl , { useUnifiedTopology: true }).then(()=> {
           return User.findOne({email:email})
        }).then(user=> {
            if(user) {
                mongoose.disconnect()
                reject('this email is used before');
            }
            else{
                return bcrypt.hash(password , 10)
            }
        }).then(hashedPassword=> {
            let user = new User ({
                username : username,
                email : email,
                password : hashedPassword ,
            }) 
             return user.save()
        }).then(()=> {
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
         })
    })
}

// 2 Login 
exports.login = (email, password)=>{
    return new Promise ((resolve , reject)=>{
        mongoose.connect(DB_URl, { useNewUrlParser: true}).then(()=>{
             User.findOne({email : email}).then(user=>{
                if(!user){
                    mongoose.disconnect()
                    reject('there is no user matches this email');
                }else{
                   bcrypt.compare(password , user.password)
                    .then(same=>{
                        if(!same){
                            mongoose.disconnect()
                            reject('password is incorrect')
                        }else{
                            mongoose.disconnect()
                            resolve({
                                id: user.email,
                                isAdmin: user.isAdmin
                            })
                        }
                    });
                }
                
            }).catch(err=>{
                mongoose.disconnect()
                reject(err)
            })
        });

    })
}