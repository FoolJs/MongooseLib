const commentModel = require( '../model/comment' );
const BaseCrud = require( './baseCrud' );

class CommentDao extends BaseCrud {
    constructor() {
        super(commentModel);
    }




    
}





module.exports = CommentDao;