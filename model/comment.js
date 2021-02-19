const { Schema } = require('mongoose');
const { db } = require('../connect/db');

const commentSchema = new Schema({
    CommentArticleId: Schema.Types.ObjectId, // 对应的文章的_id
    CommentUserId: Schema.Types.ObjectId, // 评论的用户的_id
    CommentUserAvatar: String, // 评论用户的头像
    CommentUserNickName: String, // 评论用户的昵称
    CommentUserIdentify: String, // 用户的身份
    CommentContent: String, // 用户评论的内容
    CommentTime: Date, // 评论时间
    CommentOnComments: [
        {
            CommentTime: Date, // 评论时间
            CommentUserId: Schema.Types.ObjectId, // 评论的用户的_id
            CommentUserAvatar: String, // 评论用户的头像
            CommentUserNickName: String, // 评论用户的昵称
            CommentContent: String, // 用户评论的内容
            CommentUserIdentify: String, // 评论用户的身份
            CommentTarget: Schema.Types.ObjectId, // 评论对象
        },
    ],
});

let commentModel = db.model('Comments', commentSchema, 'Comments');

module.exports = commentModel;




