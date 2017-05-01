var express = require('express')

var router = express.Router()

router.get('/', function(req,res,next){
    console.log("got a GET request!")
      res.redirect('/');
    next()
})

router.post('/',function(req,res,next){
    console.log('got POST request!')
    console.log(req.body)
    res.json(req.body)
    next()
})

router.get('/add', function(req, res) {
  res.render('addpage');
});


module.exports = router