var express = require('express');
var tourController = require('../controllers/tourController');
var router = express.Router();

router.route('/').get(tourController.getTour);

module.exports = router;