var Divesite = require('../models/divesite');
var Animal = require('../models/animal');
var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        site_count: function(callback) {
            Divesite.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    }, function(err, results) {
        res.render('index', { title: 'Dive site home', error: err, data: results });
    });
};

exports.divesite_list = function(req, res, next) {

  Divesite.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_divesites) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('divesite_list', { title: 'Dive sites', divesite_list: list_divesites });
    });

};

// Display detail page for a specific Author.
exports.divesite_detail = function(req, res, next) {

    async.parallel({
        divesite: function(callback) {
            Divesite.findById(req.params.id)
              .exec(callback)
        },
        divesite_animals: function(callback) {
          Animal.find({ 'divesite': req.params.id },'name')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.divesite==null) { // No results.
            var err = new Error('Dive site not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('divesite_detail', { title: 'Divesite', divesite: results.divesite, animals_at_divesite: results.divesite_animals });
    });

};