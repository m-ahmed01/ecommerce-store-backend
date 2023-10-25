

const express = require('express');  // general server
const { fetchUserById, updateUser } = require('../controller/User');


const router = express.Router();

//  /users is already added in base path

router.get('/own', fetchUserById);
router.patch('/:id', updateUser);
      



exports.router = router;