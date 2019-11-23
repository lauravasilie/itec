const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const User = new Schema ({
        name: { 
                first: { type: String, required: true },
                last: { type: String, required: true }
        },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        company: { type: Boolean, required: true },
        isBuyer: { type: Boolean, required: true },
        password: { type: String, required: true },
        tokens: [{
                token: { type: String }
        }],
        products: [{
                product: {
                        category: { type: String, required: true },
                        subcategory: { type: String, required: true },
                        price: { type: String, required: true },
                        quantity: { type: Number, required: true },
                        location: { type: String, required: true },
                        description: { type: String, required: true }
                }
        }]
});

User.methods.newAuthToken = async function(){
        const user  = this
        const token =  jwt.sign({ _id: user.id.toString() }, user.email, {expiresIn: "7 days"})
        user.tokens = user.tokens.concat({ token })
        await user.save()
        return token
}

 User.pre('save', async function(next){
        const user = this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()
})

User.plugin(passportLocalMongoose, { usernameField: 'email' });
// User.plugin(findOrCreate);

module.exports = mongoose.model('User', User);

