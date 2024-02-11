const express = require('express');
const userCtrl = require('./user.controller');

const router = express.Router();

router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);

module.exports = router;