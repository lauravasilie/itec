const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uuidv4 = require('uuidv4')
const jwt = require('jsonwebtoken')
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const User = new Schema ({
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        company: { type: Boolean, required: true },
        isBuyer: { type: Boolean, required: true },
        password: { type: String, required: true },
        description: { type: String },
        photo: { type: String }
});

User.pre('save', async function(next){
        const user = this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()
})

User.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', User);

