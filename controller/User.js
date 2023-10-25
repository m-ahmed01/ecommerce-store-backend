
const { User } = require("../model/User");

exports.fetchUserById = async (req,res) =>{
    const {id} = req.user;
    try{
        // const user = await User.findById(id,'name email id').exec(); // fetch all categories
        const user = await User.findById(id); // fetch all categories
     
        res.status(200).json({id:user.id, addresses:user.addresses, email:user.email, role:user.role});
    }catch(err){
        res.status(400).json(err);

    }
    
};




exports.updateUser = async (req,res) =>{
    const {id} = req.params;
    try{
        const user = await User.findByIdAndUpdate(id, req.body, {new: true}); // new true means we get the latest product now
        res.status(200).json(user);
    }catch(err){

        res.status(400).json(err);
    }
};

