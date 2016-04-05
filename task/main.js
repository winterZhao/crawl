var async = require('async');
var read = require('./read.js');
var save = require('./save.js');
var debug = require('debug')('crawl:main');
var url = 'http://top.baidu.com/category?c=10&fr=topindex';
var categories =[],articles=[];
async.series([
    //得到分类列表
    function(done){
        read.category(url,function(err,list){
            categories = list;
            done(err);
        })
    },
    //将分类列表保存到数据库中
    function(done){
        save.category(categories,done)
    },
    function(done){
        async.forEach(categories,function(category,next){
            read.article('http://top.baidu.com/buzz?b='+category.id+'&c=10&fr=topcategory_c10',category.id,function(err,items){
                  articles = articles.concat(items);
                  next()
            });
        },done)
    },
    function(done){
        save.article(articles,done);
    }
],function(err,result){
    if(err)throw err;
    else {
        debug('所有的任务完成了');
    }
})