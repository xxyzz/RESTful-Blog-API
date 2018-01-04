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