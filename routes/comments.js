module.exports = {
  getComments(req, res) {
    res.status(200).send(req.store.posts[req.params.postId].comments)
  }, 
  addComment(req, res) {
    // Check request text
    if (!req.body.text)
      return res.status(400).send({
        error: 'Please post a comment with text.'
      })
    let newComment = {
      text: req.body.text
    }
    let commentId = req.store.posts[req.params.postId].comments.length
    req.store.posts[req.params.postId].comments.push(newComment)
    res.status(201).send({commentId: commentId})
  },
  updateComment(req, res) {
    if (!req.body.text)
      return res.status(400).send({
        error: 'Please post a comment with text.'
      })
    let newComment = {
      text: req.body.text
    }
    req.store.posts[req.params.postId].comments[req.params.commentId] = newComment
    res.status(200).send(req.store.posts[req.params.postId].comments[req.params.commentId])  
  },
  removeComment(req, res) {
    req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
    res.status(204).send()
  }  
}