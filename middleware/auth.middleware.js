const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");


// on va cheker si le user et bien connécté tout au long de la navigation en verifiant le token
module.exports.checkUser = (req, res, next) => {
  // on check le cookie
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
       
        next();
      } else {
        // sinon on decode le token
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// un module pour s'authentifier controler si le token correspond a qqun dans la BDD
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // si token verification
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('pas de  token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
