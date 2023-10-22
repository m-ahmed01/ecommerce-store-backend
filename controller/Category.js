const { Category } = require("../model/Category");

exports.fetchCategories = async (req,res) =>{

    try{
        const categories = await Category.find({}).exec(); // fetch all categories
        res.status(200).json(categories);
    }catch(err){
        res.status(400).json(err);

    }
    
};



exports.createCategory = async (req,res) =>{
    const category = new Category(req.body); // came from frontEnd
    try{

        const doc = await category.save();
        res.status(201).json(doc);
    }catch(err){

        res.status(400).json(err);
    }
    
};