var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://127.0.0.1/mydb');

var Parents = require('../models/parents');


router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {

	Parents.find(function (err, parents){
    res.render('api', {parents: parents});
  });
});


router.route('/parents')

    // create a parents (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var parents = new Parents();      // create a new instance of the Parents model
        parents.name = req.body.name;  // set the parents name (comes from the request)
        parents.birthdate = req.body.birthdate;
        parents.father = req.body.father;
        // save the parents and check for errors
        parents.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Parents created!' });
        });
    })

    
    .get(function(req, res) {
       Parents.find(function(err, parents) {
       if (err)
         res.send(err);
           res.json(parents);
         });
    });


router.route('/parents/:parents_id')

    .get(function(req, res) {
         Parents.findById(req.params.parents_id, function(err,
           parents) {
           if (err)
             res.send(err);
             res.json(parents);
           });
})

    .put(function(req, res) {
         Parents.findById(req.params.parents_id, function(err,
           parents) {
           if (err)
             res.send(err);
       // set the parents properties (comes from the request)
         parents.name = req.body.name;
         parents.birthdate = req.body.birthdate;
         parents.father = req.body.father;
       // save the data received
         parents.save(function(err) {
           if (err)
         res.send(err);
         // give some success message
         res.json({ message: 'Parents successfully updated!'});
});
}); })



    .delete(function(req, res) {
     Parents.remove({
       _id: req.params.parents_id
     }, function(err, parents) {
       if (err)
         res.send(err);
   // give some success message
     res.json({ message: 'Parents successfully deleted!' });
     });
});



router.route('/show/:parents_id')

    .get(function(req, res) {
         Parents.findById(req.params.parents_id, function(err,
           parents) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + parents._id);
        var name = parents.name;
        var birthdate = parents.birthdate;
        var father = parents.father; 

        res.format({
          html: function(){
              res.render('show', {
                "name" : name,
                "birthdate" : birthdate,
                "father" : father
              });
          },
          json: function(){
              res.json(parents);
          }
        });
      }
           });
});

router.route('/childs/')

      .get(function (req, res){
      //find blob by ID
       Parents.findById(req.params.father, function(err,
           parents) {
          if (err) {
              return console.error(err);
          } else {
                  console.log('GET Retrieving ID: ' + parents.father);
                  var name = parents.name;
                  var birthdate = parents.birthdate;
                  var father = parents.father; 

                  res.format({
                  html: function(){
                                   res.render('show', {
                                   "name" : name,
                                   "birthdate" : birthdate,
                                  "father" : father
              });
          },
                  json: function(){
                  res.json(parents);
          }
        });
          }
      });
  });



module.exports = router;