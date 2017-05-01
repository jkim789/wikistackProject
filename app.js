const express = require('express')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const path = require('path')
const app = express()
var models = require('./models');
var PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))

nunjucks.configure('views', {noCache: true})  //using nunjucks to render.
app.set('view engine','html')
app.engine('html',nunjucks.render)

models.User.sync({})
.then(function () {
  return models.Page.sync({})
})
.then(function () {
  app.listen(PORT, function(){
    console.log('Our server is on!')
  })
})
.catch(console.error)



app.get('/', function(req,res,next){
    res.render('index')
})
