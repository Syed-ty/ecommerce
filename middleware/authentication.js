const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({
    error: true,
    message: "Access Denied / Unauthorized request"
  });

  try {
    token = token.split(' ')[1]
    if (token === null || !token) return res.status(401).json({
      error: true,
      message: "Access Denied / Unauthorized request"
    });

    let verifiedUser = jwt.verify(token, process.env.jwtSecret);
    if (!verifiedUser) {
        console.log("not verigy");
      return res.status(401).json({
        error: true,
        message: "Access Denied / Unauthorized request"
      });
    } else {
      next()
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  auth
}



// const jwt = require('jsonwebtoken')

// function auth(req,res,next){
//  const token = req.header('x-auth-token');
//  if(!token) return res.status(401).send('Access denied. no token provided (unauthorized!!!!!)')
//  try{
//     const decoded = jwt.verify(token,process.env.jwtSecret);
//     req.user = decoded;
//     next();
//  }
//  catch(err){
//     res.status(400).send('Invalid token....')
//  }
// }
// module.exports = auth