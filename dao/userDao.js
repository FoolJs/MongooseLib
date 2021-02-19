const userModel = require( '../model/user' );
const BaseCrud = require( './baseCrud' );

class UserDao extends BaseCrud {
    constructor() {
        super(userModel);
    }


    
}



module.exports = UserDao;