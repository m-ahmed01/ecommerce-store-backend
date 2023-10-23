


const express = require('express');  // general server
const { createUser, loginUser } = require('../controller/Auth');


const router = express.Router();

//  /auth is already added in base path

router.post('/signup', createUser);
router.post('/login', loginUser);

      



exports.router = router;