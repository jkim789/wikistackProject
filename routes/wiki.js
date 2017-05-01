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
    page.save().then(function(savedPage){
      res.redirect(savedPage.route); // route virtual FTW
    }).catch(next);
    // page.save().then(function(result){
    //   res.json(result)
    // })
    // res.jsons a page saved to the databas ^^^
    // res.redirect('/')
    // next()
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
    // console.log(foundPage)
    var renderObject = foundPage;
    console.log(renderObject.urltitle, renderObject.title, renderObject.content)
    res.render('wikipage', {
      title: renderObject.title,
      urltitle: renderObject.urltitle,
      content:  renderObject.content
    });
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
