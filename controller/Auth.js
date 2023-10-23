const { User } = require("../model/User");

exports.createUser = async (req,res) =>{
    const user = new User(req.body); // came from frontEnd
    try{

        const doc = await user.save();
        res.status(201).json({id:doc.id, role:doc.role});
    }catch(err){

        res.status(400).json(err);
    }
    
};



exports.loginUser = async (req,res) =>{
    try{
        const user=  await User.findOne({email:req.body.email}).exec();
        console.log({user})
        // ToDo Temporary, will include strong password
        if(!user){
            res.status(401).json({message: "User doesn't exist with this Email"});
        }else if(user.password === req.body.password ){
            // ToDo: make addresses independent of login
            res.status(200).json({id:user.id, email:user.email, role:user.role}); //  email:user.email,  => this part is extra
            
        }else{
            res.status(401).json({message: "Invalid Credentials!!"});

        }
    }catch(err){

        res.status(400).json(err);
    }

}