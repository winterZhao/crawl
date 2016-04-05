var mysql = require('mysql');
var async = require('async');
var debug = require('debug')('crawl:save');
var pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'crawl'
});

exports.category = function(list,callback){
     async.forEach(list,function(item,cb){
         debug('目录保存到数据库!');
         pool.query('replace into category(id,name,url) values(?,?,?)',[item.id,item.name,item.url], function(err, rows, fields) {
             if (err) throw err;
             cb();
         });
     },callback);
};

exports.article = function(list,callback){
    async.forEach(list,function(item,cb){
        debug('文章列表保存到数据库!');
        pool.query('replace into article(name,url,cid) values(?,?,?)',[item.name,item.url,item.cid], function(err, rows, fields) {
            cb();
        });
    },callback);
};

//async.forEach(list,function(item,cb){
//    debug('保存文章',JSON.stringify(item));
//    pool.query('replace into article(name,url,cid) values(?,?,?)',[item.name,item.url,item.cid],function(err,result){
//        cb();
//    });
//},callback);





//pool.on('connection', function (connection) {
//    connection.query('SET SESSION auto_increment_increment=1')
//});
//pool.end(function (err) {
//    // all connections in the pool have ended
//});

//pool.destroy();