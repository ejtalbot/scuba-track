var express = require('express');
var router = express.Router();

var divesite_controller = require('../controllers/divesiteController');
var animal_controller = require('../controllers/animalController');

/* GET home page. */
router.get('/', divesite_controller.index);

/*GET list of dive sites*/
router.get('/divesites', divesite_controller.divesite_list);

/*GET specific divesite*/
router.get('/divesites/:id', divesite_controller.divesite_detail);

/*GET list animals*/
router.get('/animals', animal_controller.animal_list);
/*GET specific animal*/
router.get('/animals/:id', animal_controller.animal_detail);

module.exports = router;