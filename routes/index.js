var express = require('express');
var router = express.Router();
const fetchCommentPage = require('youtube-comment-api')
const videoId = 'h_tkIpwbsxY'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/get-comments', function(req, res, next) {

  var response;

  fetchCommentPage(req.body.url)
  .then(commentPage => {
    console.log(commentPage)
    return fetchCommentPage(videoId, commentPage.nextPageToken)
  })

  res.render('comments', {comments: response});
});

module.exports = router;
