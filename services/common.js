
const passport = require('passport');
exports.isAuth = (req,res,done)=>{
  return passport.authenticate('jwt');
  };

exports.sanitizeUser = (user)=>{
    return {id: user.id, role:user.role}
}

exports.cookieExtractor = function(req){
  let token = null;
  if(req && req.cookies){
    token = req.cookies['jwt'];
  }
  // adding temporary token for testing
  token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Mzk5NTIzNzI5ZmQ2MTU4NmQwNzJhMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5ODI3MjY1MH0.0tJUzzWWCpJLnz_KSRaO6idP_plj_1ifyJsPLXizyBA";
  return token;
};