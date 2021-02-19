const articleModel = require( '../model/article' );
const BaseCrud = require( './baseCrud' );

/**
 * @class Article构造函数
 * @extends BaseCrud
 */
class ArticleDao extends BaseCrud {
    constructor() {
        super(articleModel);
    }

}

module.exports = ArticleDao; 