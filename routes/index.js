// var express = require('express');
// var router = express.Router();
// const fetchCommentPage = require('youtube-comment-api')
// const videoId = 'h_tkIpwbsxY'
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });
//
// router.post('/get-comments', function(req, res, next) {
//
//   var videoId = req.body.videoId;
//
//   fetchCommentPage(videoId).then(commentPage => {
//     console.log(commentPage);
//     res.render('comments', {comments: commentPage.comments});
//     return fetchCommentPage(videoId, commentPage.nextPageToken);
//   });
//
// });
//
// module.exports = router;


var express = require('express');
var router = express.Router();
const Task = require('data.task')
const fetchComments = require('youtube-comments-task')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/get-comments', function(req, res, next) {

  var videoId = req.body.videoId;
  console.log("Video Id: " + videoId);

  const Task = require('data.task');
  const fetchComments = require('youtube-comments-task');

  const fetchAllComments = (videoId, pageToken, fetched = []) =>
    fetchComments(videoId, pageToken)
      .chain(
        ({ comments, nextPageToken }) =>
        nextPageToken
          ? fetchAllComments(videoId, nextPageToken, fetched.concat(comments))
          : Task.of(fetched.concat(comments))
        );

  fetchAllComments(videoId)
  .fork(e => console.error('ERROR', e),
        allComments => {
          console.log(allComments);
          res.render('comments', {comments: allComments});
        });

});

module.exports = router;
