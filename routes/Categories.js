
const express = require('express');  // general server
const { fetchCategories, createCategory } = require('../controller/Category');

const router = express.Router();

router.get('/', fetchCategories); //  /categories is already added in base-path
router.post('/', createCategory); 
      



exports.router = router;