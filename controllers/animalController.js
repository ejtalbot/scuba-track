var Divesite = require('../models/divesite');
var Animal = require('../models/animal');
var async = require('async');

exports.animal_list = function(req, res, next) {

  Animal.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_animals) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('animals_list', { title: 'Animals', animal_list: list_animals });
    });

};

// Display detail page for a specific Animal
exports.animal_detail = function(req, res, next) {

    async.parallel({
        animal: function(callback) {
            Divesite.findById(req.params.id)
              .exec(callback)
        },
        animal_divesites: function(callback) {
          Divesite.find({ 'divesite': req.params.id },'name')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.divesite==null) { // No results.
            var err = new Error('Animal site not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('animal_detail', { title: 'Animal', animal: results.animal, animal_divesite_list: results.animal_divesites } );
    });

};