const articleTypeModel = require( '../model/articleType' );
const BaseCrud = require('./baseCrud');





class ArticleTypeDao extends BaseCrud {
    constructor() {
        super(articleTypeModel);
    }


}


module.exports = ArticleTypeDao;