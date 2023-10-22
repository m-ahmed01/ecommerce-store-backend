
const express = require('express');  // general server
const { fetchBrands, createBrand } = require('../controller/Brand');

const router = express.Router();

router.get('/', fetchBrands);//  /Brands is already added in base-path
router.post('/', createBrand);
      



exports.router = router;