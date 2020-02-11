const express = require('express');
const router = express.Router();
const Auth = require('../controller/auth');

router.post('/register', Auth.register);

router.post('/login', Auth.login);

router.get('/user', Auth.user);

router.post('/logout', Auth.logout);

module.exports = router;