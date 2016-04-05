var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var debug = require('debug')('crawl:read');
//var listArray = [];
//var categoryUrl = 'http://top.baidu.com/category?c=10&fr=topindex';
//request模块用于向目标url发送请求，获取网页信息;
//这里encoding设置为null会直接返回buffer,即body为一个buffer值;
//列表页

exports.category = function(categoryUrl,callback){
    request({url:categoryUrl,encoding:null},function(error,response,body){
        if(error){
            console.error(error);
        } else if(!error && response.statusCode ==200){
            //由于目标网页的编码格式为gbk的，所以需要转码;
            body =iconv.decode(body,'GBK');
            var  $ = cheerio.load(body);
            var items =[];
            $('.hd h2.title a').each(function(){
                var $this = $(this);
                var item = {
                    name:$this.text().trim(),
                    url:$this.attr('href'),
                }
                item.id = params(item.url).b;
                items.push(item);

            });

        }
        callback(null,items);
        debug('读取到目录!');
    })
}



//详情页
//var articleUrl = 'http://top.baidu.com/buzz?b=7&fr=topbuzz_b353_c10';
exports.article = function(url,cid,callback){
    request({url:url,encoding:null},function(error,response,body){
        if(error){
            console.error(error);
        } else if(!error && response.statusCode ==200){
            //由于目标网页的编码格式为gbk的，所以需要转码;
            body =iconv.decode(body,'GBK');
            var  $ = cheerio.load(body);
            var items =[];
            $('.keyword a.list-title').each(function(){
                var $this = $(this);
                var item = {
                    name:$this.text().trim(),
                    url:$this.attr('href'),
                    cid:cid,
                }
                items.push(item);
            });
        }
        callback(null,items);
        debug('读取到文章列表!');
    })
}

function params(url){
    var urlObj = {};
     url.replace(/([^?&=]*)=([^?&=]*)/g,function(src,$1,$2){
         urlObj[$1] = $2;
    })
    return urlObj;
}








