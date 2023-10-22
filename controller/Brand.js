const { Brand } = require("../model/Brand");

exports.fetchBrands = async (req,res) =>{

    try{
        const brands = await Brand.find({}).exec(); // fetch all brands
        res.status(200).json(brands);
    }catch(err){
        res.status(400).json(err);

    }
    
};


exports.createBrand = async (req,res) =>{
    const brand = new Brand(req.body); // came from frontEnd
    try{

        const doc = await brand.save();
        res.status(201).json(doc);
    }catch(err){

        res.status(400).json(err);
    }
    
};