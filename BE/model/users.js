const mongoose = require('mongoose');
const schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/index')

const userSchema = new schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    mobile: {
        type: String
    },
    avatar: Object,
    role: {
        type: String,
        enum: ['Member', 'Admin']
    }
})

userSchema.methods.generateToken = function () {
    let token = jwt.sign({
        name: this.name,
        email: this.email,
        gender: this.gender,
        mobile: this.mobile,
        avatar: this.avatar,
        id: this._id.toString()
    },
        SECRET,
        { expiresIn: 60 * 60 * 24 });
    return token
}

const UserSchema = mongoose.model('UserSchema', userSchema)

exports.UserSchema = UserSchema