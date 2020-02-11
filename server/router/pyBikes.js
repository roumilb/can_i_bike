const express = require('express');
const router = express.Router();
const pyBikes = require('../controller/pyBikes');

router.get('/', pyBikes.getAllCities);

router.get('/:city', pyBikes.getAllStations);

module.exports = router;