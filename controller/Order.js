

const { Order } = require("../model/Order");

exports.fetchOrdersByUser = async (req,res) =>{
    const {userId} = req.params;
    try{
        const orders = await Order.find({user:userId});
        // .populate('product') // use populate to get the full details of user and product
        res.status(200).json(orders);
    }catch(err){
        res.status(400).json(err);

    }
    
};


exports.createOrder = async (req,res) =>{
    const order = new Order(req.body); // came from frontEnd
    try{

        const doc = await order.save();
    //    const result = await doc.populate('product')
        res.status(201).json(doc);
    }catch(err){

        res.status(400).json(err);
    }
    
};

exports.deleteOrder = async (req,res) =>{
    const {id} = req.params;
    try{

        const order = await Order.findByIdAndDelete(id);

        res.status(200).json(order);
    }catch(err){

        res.status(400).json(err);
    }
    
};

exports.updateOrder = async (req,res) =>{
    const {id} = req.params;
    try{
        const order = await Order.findByIdAndUpdate(id, req.body, {new: true}); // new true means we get the latest product now
        res.status(200).json(order);
    }catch(err){

        res.status(400).json(err);
    }
};

// Admin APi
exports.fetchAllOrders = async (req,res) =>{
    // we need all queryString

      // filter  = {"category": ["smartphone","laptops"]}
  // sort = {_sort:"price", _order="desc"}
  // pagination = {_page:1, _limit=10}  // _page=1&_limit=10

  // We have to try with multiple categories and brands after change in front-end


    let query = Order.find({deleted:{$ne:true}}); // it is query of MongoDb(dont show deleted products)
    let totalOrdersQuery=Order.find({deleted:{$ne:true}});
    // below code not needed
    // if(req.query.category){
    //     query = query.find({category: req.query.category});
    //     totalProductsQuery = totalProductsQuery.find({category: req.query.category});
    // }
    // if(req.query.brand){
    //     query =  query.find({brand: req.query.brand});
    //     totalProductsQuery = totalProductsQuery.find({brand: req.query.brand});
    // }

    if(req.query._sort && req.query._order){
        query =  query.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs = await totalOrdersQuery.count().exec();
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