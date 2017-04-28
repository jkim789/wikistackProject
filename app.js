const express = require('express')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))

nunjucks.configure('views', {noCache: true})  //using nunjucks to render.
app.set('view engine','html')
app.engine('html',nunjucks.render)


var PORT = 3000
app.listen(PORT, function(){
    console.log('Our server is on!')
})

app.get('/', function(req,res,next){
    res.render('index')
})