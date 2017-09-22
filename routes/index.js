var express = require('express');
var router = express.Router();
var scraper = require("youtube-comment-scraper");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/get-comments', function(req, res, next) {

    var response =  scraper.comments(req.body.url).then(function(rsp) {
    return rsp;
    console.log(rsp);
    // Close scraper.
    scraper.close();
  });

  console.log("response:" + response);
  res.render('comments', {comments: response});
});

module.exports = router;
