var express = require('express')

var router = express.Router()
var wikiRouter = require('./wiki')
var userRouter = require('./user')



router.use('/wiki', wikiRouter)


module.exports=router

