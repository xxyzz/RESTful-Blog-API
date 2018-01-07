module.exports = {
  getPosts(req, res) {
  	res.status(200).send(req.store.posts)
  },
  addPost(req, res) {
    // Input validation 
    if (!req.body.name || !req.body.url || !req.body.text)
      return res.status(400).send({
        error: 'Please add a complete post.'
      })
    // Only add these three values
    let newPost = {
      name: req.body.name,
      url: req.body.url,
      text: req.body.text,
      comments: []
    }
    // Comments shouldn't be add through here
	  req.store.posts.push(newPost)
	  res.status(201).send({postId: req.store.posts.length})
  },
  updatePost(req, res) {
    // Check post id
    if (!req.store.posts[req.params.postId])
      return res.status(400).send({
        error: 'Please use a valid post id.'
      }) 
    if (!req.body.name || !req.body.url || !req.body.text)
      return res.status(400).send({
        error: 'Please post a complete post.'
      })
    let newPost = {
      name: req.body.name,
      url: req.body.url,
      text: req.body.text
    }
    newPost.comments = req.store.posts[req.params.postId].comments
  	req.store.posts[req.params.postId] = newPost
  	res.status(200).send(req.store.posts[req.params.postId])
  },
  removePost(req, res) {
    if (!req.store.posts[req.params.postId])
      return res.status(400).send({
        error: 'Please use a valid post id.'
      }) 
  	req.store.posts.splice(req.params.postId, 1)
  	res.status(204).send()
  }
}