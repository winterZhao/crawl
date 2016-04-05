var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit:10,
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'crawl'
});
exports.category = function(callback){
    pool.query('select * from category',function(err,rows,fields){

         callback(err,rows);
    })
};
exports.article = function(callback){
    pool.query('select * from article',function(err,rows){
        callback(err,rows);
    })
}