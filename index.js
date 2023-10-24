const express = require('express');  // general server
const server= express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order.js');
const { User } = require('./model/User');
const { isAuth, sanitizeUser } = require('./services.js/common');

// const { createProduct } = require('./controller/Product');
const SECRET_KEY = 'SECRET_KEY';
// JWT Options
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY; // should not be in code

// middlewares
server.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));
server.use(passport.authenticate('session'));



server.use(cors({
  exposedHeaders:['X-Total-Count']
}));

server.use(express.json()); // so that we use json type on server (to parse req.body)
server.use('/products',isAuth(), productsRouter.router);  // can also use JWT Token for client-only auth
server.use('/categories',isAuth(), categoriesRouter.router);
server.use('/brands',isAuth(), brandsRouter.router);
server.use('/users',isAuth(), usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',isAuth(), cartRouter.router);
server.use('/orders',isAuth(), ordersRouter.router);

// Passport Strategies (local, jwt )
passport.use('local', new LocalStrategy({usernameField:'email'} , async function(email, password, done) {
    // default=> username
    try{
      const user=  await User.findOne({email:email}).exec();
      // console.log({user})
      if(!user){
        done(null, false,{message: "User doesn't exist with this Email"}); // or: Invalid Credentials
      }
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
           if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              // ToDo: make addresses independent of login
            return  done(null, false,{message: "Invalid Credentials!!"});
              
            }else{
              const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            done(null,token ); // this send to serialize and sanitize the user where authentication is concerned
    
          }
        });

     
  }catch(err){

      done(err);
  }
  }
));


passport.use('jwt',new JwtStrategy(opts, async function(jwt_payload, done) {
  console.log({jwt_payload});
  try{
    const user = await User.findOne({id: jwt_payload.sub});
   
  if (user) {
      return done(null, sanitizeUser(user)); // this calls serializer
  }else {
    return done(null, false);
}
  }catch(err){
  
      return done(err, false);
  }
  }));




// This creates session variable req.user on calling
passport.serializeUser(function(user, cb) {
  console.log('serialize',user);
  process.nextTick(function() {
    return cb(null,{id:user.id, role: user.role});
  });
});


// this creates session variable req. user when called from authorized request

passport.deserializeUser(function(user, cb) {
  console.log('de-serialize',user);

  process.nextTick(function() {
    return cb(null, user);
  });
});


main().catch(err => console.log(err));

 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/new-Ecommerce-Backend');
    console.log("database connected")
  }


// server.get('/', (req,res)=>{
//     res.json({status:'success'})
// });




server.listen(8080, ()=>{   //port number + call back
    console.log('Server Started');
});