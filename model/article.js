const { Schema } = require( 'mongoose' );
const { db } = require( '../connect/db' );

const articleSchema = new Schema({
    Title: {
        type: String,
    },
    CreateTime: {
        type: Date,
        default: new Date(),
    },
    UpdateTime: {
        type: Date,
        default: new Date(),
    },
    Type: {
        type: String,
    },
    Introduction: {
        type: String,
    },
    Cover: {
        type: String,
    },
    Content: {
        type: String,
    },
    Count: {
        type: Number,
        default: 0,
    },
    CommentCount: {
        type: Number,
        default: 0
    }
});

let articleModel = db.model('Articles', articleSchema, 'Articles');

module.exports = articleModel;