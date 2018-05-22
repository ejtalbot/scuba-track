var express = require('express');
var router = express.Router();

var divesite_controller = require('../controllers/divesiteController');
var animal_controller = require('../controllers/animalController');

/* GET home page. */
router.get('/', divesite_controller.index);

/*GET list of dive sites*/
router.get('/divesites', divesite_controller.divesite_list);

// GET request to create a new divesite 
router.get('/divesites/create', divesite_controller.divesite_create_get);

/*GET specific divesite*/
router.get('/divesites/:id', divesite_controller.divesite_detail);

// POST request for creating a new divesite
//router.post('/divesites/create', divesite_controller.divesite_create_post);

/*GET list animals*/
router.get('/animals', animal_controller.animal_list);
/*GET specific animal*/
router.get('/animals/:id', animal_controller.animal_detail);

module.exports = router;