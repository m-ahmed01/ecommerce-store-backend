const express = require('express');  // general server
const server= express();
const mongoose = require('mongoose');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const cors = require('cors');
// const { createProduct } = require('./controller/Product');

// middlewares
server.use(cors({
  exposedHeaders:['X-Total-Count']
}));
server.use(express.json()); // so that we use json type on server (to parse req.body)
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandsRouter.router);

main().catch(err => console.log(err));

 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/new-Ecommerce-Backend');
    console.log("database connected")
  }


server.get('/', (req,res)=>{
    res.json({status:'success'})
})


server.listen(8080, ()=>{   //port number + call back
    console.log('Server Started');
})