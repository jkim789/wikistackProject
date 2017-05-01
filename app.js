const express = require('express')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const path = require('path')
const app = express()
const routes = require('./routes')
const bodyParser  = require('body-parser')
var models = require('./models');
var Page = models.Page
var PORT = 3000


app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

nunjucks.configure('views', {noCache: true})  //using nunjucks to render.
app.set('view engine','html')
app.engine('html',nunjucks.render)

/// **** THE BELOW IS FOR SYNCING THE ENTIRE DATABASE, WHICH INCLUDES ALL MODELS...

models.db.sync({})
.then(function () {
  app.listen(PORT, function(){
    console.log('Our server is on!')
  })
})
.catch(console.error)

// app.use('/', bodyParser)


app.use('/', routes)


/// **** THE BELOW IS FOR SYNCING ONE MODEL AT A TIME...
// models.User.sync({})
// .then(function () {
//   return models.Page.sync({})
// })
// .then(function () {
//   app.listen(PORT, function(){
//     console.log('Our server is on!')
//   })
// })
// .catch(console.error)

app.get('/', function(req,res,next){
    Page.findAll()
    .then(function(pages){
      console.log(pages.dataValues.title)
      res.render('index', pages)    
    })
})
