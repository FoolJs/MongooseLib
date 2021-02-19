//!: db.js
const mongoose = require( 'mongoose' );
const MongoConfig = require( './config.js' );


function getMongoUri() {
    let mongoUri = 'mongodb://';
    const dbName = MongoConfig.db;
    mongoUri += `${MongoConfig.host}:${MongoConfig.port}/${dbName}`;
    return mongoUri;
}

function getMongoOptions() {
    let options = {
        /*
         *是否使用新的解析器，
         *是否使用统一的拓扑结构，
         *必须设置为True，否则会报错，
         */
        useNewUrlParser: true,
        useUnifiedTopology: true,
        /*
        *维护最多10个连接 
         */
        poolSize: 10,
    };
    if( MongoConfig.user ) {
        options.user = MongoConfig.user;
        options.pass = MongoConfig.pass;
    }
    return options;
}

//!: 连接数据库，
const db = mongoose.createConnection( getMongoUri(), getMongoOptions() );

//!: 连接成功回调，
db.on( 'connected', function() {
    console.log(` Mongoose connected => ${ getMongoUri() }. `);
} );

//!: 连接失败回调，
db.on( 'error', function( err ) {
    console.log(` Mongoose connected error => ${ err }. `);
} );

//!: 连接断开回调，
db.on( 'disconnected', function() {
    console.log('Mongoose connected  => disconnected.');
} );


function close() {
    db.close();
}

function convertObjectId( value ) {
    return mongoose.Types.ObjectId( value );
}


module.exports = {
    db,
    close,
    convertObjectId,
};




