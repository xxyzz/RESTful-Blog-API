const checkId = (req, res, next) => {
  // Check post id and comment id
  if (req.params.postId && !req.store.posts[req.params.postId]) {
    return res.status(400).send({
      error: 'Please use a valid post id.'
    })
  }
  if (req.params.commentId && !req.store.posts[req.params.postId].comments[req.params.commentId]) {
    return res.status(400).send({
      error: 'Please use a valid comment id.'
    })
  }
  next()
}

module.exports = {
  posts: require('./posts'),
  comments: require('./comments'),
  checkId
}