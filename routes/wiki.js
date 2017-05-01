var express = require('express')

var router = express.Router();

var User = require('../models').User;
var Page = require('../models').Page;

router.get('/', function(req,res,next){
    console.log("got a GET request!")
      res.redirect('/');
    next()
})

router.post('/',function(req,res,next){

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    })


    // console.log('got POST request!')
    // console.log(req.body)
    // res.json(req.body)
    page.save()
    // page.save().then(function(result){
    //   res.json(result)
    // });

    // res.jsons a page saved to the databas ^^^
    // res.redirect('/')
    res.json(req.body)
    next()
})


router.get('/add', function(req, res) {
  res.render('addpage');
});


router.get('/:urltitle', function (req, res, next) {

  Page.findOne({
    where: {
      urltitle: req.params.urltitle
    }
  })
  .then(function(foundPage){
    // res.json(foundPage);
    var renderObject = foundPage;
    res.render('wikipage', renderObject);
  })
  .catch(next);

});


// router.get('/:urltitle', function(req, res, next){
//   console.log(' i got a request')
//     Page.findOne({
//       where: {
//         urltitle: req.params.urltitle
//       }
//     })
//     .then(function(foundPage){
//       res.json(foundPage);
//     })
//     .catch(next)
// })
  // res.send(req.params.urltitle)

module.exports = router
