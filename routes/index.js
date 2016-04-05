var express = require('express');
var router = express.Router();
var db = require('../db/index');
var async = require('async');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  async.parallel([
      function(cb){
        db.category(cb);
      },
      function(cb){
        db.article(cb);
      }
  ],function(err,result){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        categories:result[0],
        articles:result[1]
      });

    }
  })
});

//router.get('/buzz',function(req,res,next){
//    console.log(path.query(req.url));
//})



module.exports = router;
