const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const router = require('./routes')

let store = {
  posts: [
    {
      name: "xxyzz blog",
      url: 'https://xxyzz.me',
      text: 'xxxxxx',
      comments: [
        {text: '1'},
        {text: '2'},
        {text: '3'}      
      ]
    }
  ]
}

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use((req, res, next) => {
  // Check post id and comment id
  // if (req.params.postId && !store.posts[req.params.postId]) {
  //   return res.status(400).send({
  //     error: 'Please use a valid post id.'
  //   })
  // }
  // if (req.params.commentId && !store.posts[req.params.postId].comments[req.params.commentId]) {
  //   return res.status(400).send({
  //     error: 'Please use a valid comment id.'
  //   })
  // }
  req.store = store
  next()
})

app.get('/posts', router.posts.getPosts)
app.post('/posts', router.posts.addPost)
app.put('/posts/:postId/', router.posts.updatePost)
app.delete('/posts/:postId/', router.posts.removePost)

app.get('/posts/:postId/comments', router.comments.getComments)
app.post('/posts/:postId/comments', router.comments.addComment)
app.put('/posts/:postId/comments/:commentId', router.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', router.comments.removeComment)

app.listen(3000)