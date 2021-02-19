const { Schema } = require( 'mongoose' );
const { db } = require( '../connect/db' );





const articleTypeSchema = new Schema({
    Type: {
        type: String
    },
    Article: {
        type: Array
    }
});



let articleTypeModel = db.model('ArticleTypes', articleTypeSchema, 'ArticleTypes');

module.exports = articleTypeModel;