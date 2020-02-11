const express = require('express');
const router = express.Router();
const Auth = require('../controller/auth');

router.post('/place', Auth.addPlace);
router.post('/place/delete', Auth.deletePlace);

router.post('/place/station', Auth.addStation);
router.post('/place/station/delete', Auth.deleteStation);

module.exports = router;