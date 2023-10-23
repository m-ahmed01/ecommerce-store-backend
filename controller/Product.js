const { Product } = require("../model/Product")


exports.createProduct = async (req,res) =>{
    // this product we have to give from API body
    const product = new Product(req.body); // came from frontEnd
    try{

        const doc = await product.save();
        res.status(201).json(doc);
    }catch(err){

        res.status(400).json(err);
    }
    
};

exports.fetchAllProducts = async (req,res) =>{
    // we need all queryString

      // filter  = {"category": ["smartphone","laptops"]}
  // sort = {_sort:"price", _order="desc"}
  // pagination = {_page:1, _limit=10}  // _page=1&_limit=10

  // We have to try with multiple categories and brands after change in front-end


    let query = Product.find({deleted:{$ne:true}}); // it is query of MongoDb(dont show deleted products)
    let totalProductsQuery=Product.find({deleted:{$ne:true}});
    // below order matters
    if(req.query.category){
        query = query.find({category: req.query.category});
        totalProductsQuery = totalProductsQuery.find({category: req.query.category});
    }
    if(req.query.brand){
        query =  query.find({brand: req.query.brand});
        totalProductsQuery = totalProductsQuery.find({brand: req.query.brand});
    }
    // ToDo: Sort on discounted Price, not on actual price
    if(req.query._sort && req.query._order){
        query =  query.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs = await totalProductsQuery.count().exec();
    console.log({totalDocs});

    if(req.query._page && req.query._limit){
        const pageSize = req.query._limit;
        const page = req.query._page;
        query =  query.skip(pageSize*(page-1)).limit(pageSize);
    }

    try{

        const docs = await query.exec();
        res.set('X-Total-Count',totalDocs);
        res.status(200).json(docs);
    }catch(err){

        res.status(400).json(err);
    }
    
};


exports.fetchProductById = async (req,res) =>{
    const {id} = req.params;
    try{
        const product = await Product.findById(id)
        res.status(200).json(product);
    }catch(err){

        res.status(400).json(err);
    }
};

exports.updateProduct = async (req,res) =>{
    const {id} = req.params;
    try{
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true}); // new true means we get the latest product now
        res.status(200).json(product);
    }catch(err){

        res.status(400).json(err);
    }
};

