var Divesite = require('../models/divesite');
var Animal = require('../models/animal');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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

// Display Divesite create form on GET.
exports.divesite_create_get = function(req, res, next) {       

    Animal.find({},'name')
    .exec(function (err, animals) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('divesite_form', {title: 'Mark a New Divesite', animal_list:animals});
    });
    
};

// Handle Genre create on POST.
/* exports.divesite_create_post =  [
   
    // Validate that the name field is not empty.
    body('name', 'Divesite name required').isLength({ min: 1 }).trim(),
    
    // Sanitize (trim and escape) the name field.
    sanitizeBody('name').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var divesite = new Divesite(
          { name: req.body.name }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('divesite_form', { title: 'Create New Divesite', divesite: divesite, errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid.
            // Check if divesite with same name already exists.
            Divesite.findOne({ 'name': req.body.name })
                .exec( function(err, found_divesite) {
                     if (err) { return next(err); }

                     if (found_divesite) {
                         // site exists, redirect to its detail page.
                         res.redirect(found_divesite.url);
                     }
                     else {

                         divesite.save(function (err) {
                           if (err) { return next(err); }
                           res.redirect(divesite.url);
                         });

                     }

                 });
        }
    }
];
*/