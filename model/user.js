const { Schema } = require('mongoose');
const { db } = require('../connect/db');

const userSchema = new Schema({
    UserName: {
        type: String,
    },
    NickName: {
        type: String,
        default: '宇宙次帅',
    },
    PassWord: {
        type: String,
    },
    Email: {
        type: String,
    },
    CreateTime: {
        type: Date,
        default: new Date(),
    },
    Identify: {
        type: String,
        default: 'User',
    },
    Avatar: {
        type: String,
        default: '/user/user.jpg',
    },
    Autograph: {
        type: String,
        default: '天之道，损有余而补不足，人之道，损不足而奉有余',
    },
    Gender: {
        type: String,
        default: 'M',
        trim: true,
        enum: ['M', 'F']
    },
    ArticleSub: {
        type: Boolean,
        default: false
    }
});

let userModel = db.model('Users', userSchema, 'Users');

module.exports = userModel;


