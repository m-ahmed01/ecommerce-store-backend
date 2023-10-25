const { User } = require("../model/User");
const crypto = require('crypto');
const { sanitizeUser } = require("../services/common");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SECRET_KEY';

exports.createUser = async (req,res) =>{
    try{
        
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
      const user = new User({...req.body, password:hashedPassword, salt}); // came from frontEnd
        const doc = await user.save();
        req.login(sanitizeUser(doc),(err)=>{   // this will also calls serializer and adds to session
            if(err){
                res.status(400).json(err);
            }else{
                const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
                res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000 ), httpOnly: true }).status(201).json(token); // cookie remain valid till one hour
            }
        });
        })
    }catch(err){

        res.status(400).json(err);
    }
    
};



exports.loginUser = async (req,res) =>{
    // try{
    //     const user=  await User.findOne({email:req.body.email}).exec();
    //     console.log({user})
    //     // ToDo Temporary, will include strong password
    //     if(!user){
    //         res.status(401).json({message: "User doesn't exist with this Email"});
    //     }else if(user.password === req.body.password ){
    //         // ToDo: make addresses independent of login
    //         res.status(200).json({id:user.id, email:user.email, role:user.role}); //  email:user.email,  => this part is extra
            
    //     }else{
    //         res.status(401).json({message: "Invalid Credentials!!"});

    //     }
    // }catch(err){

    //     res.status(400).json(err);
    // }
    // newly removed
    // res.json(req.user);

    res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 3600000 ), httpOnly: true }).status(201).json(req.user.token); // cookie remain valid till one hour

}

exports.checkUser = async (req,res) =>{
    res.json({status:'success',user: req.user});

}