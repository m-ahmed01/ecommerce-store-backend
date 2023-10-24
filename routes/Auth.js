


const express = require('express');  // general server
const { createUser, loginUser, checkUser } = require('../controller/Auth');
const passport = require('passport');


const router = express.Router();

//  /auth is already added in base path

router.post('/signup', createUser);
router.post('/login', passport.authenticate('local'), loginUser);
router.get('/check',passport.authenticate('jwt'), checkUser);

      



exports.router = router;