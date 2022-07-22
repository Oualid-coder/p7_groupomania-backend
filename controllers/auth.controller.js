const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

// nombre de jours ou le token est valide 
const maxAge = 3 * 24 * 60 * 60 * 1000;

// la fonction create token prend en parametre l'id du user
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

module.exports.signIn = async (req, res) => {
  // destructuring
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    // token contien l'id de l utilisateur et aussi la clé secrete et le traitement de JWT pour avoir l'unicité du token
    const token = createToken(user._id);
    // nom du cookie +le token + caractéristique: consultable que par notre  serveur avc httponly + maxage
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}

module.exports.logout = (req, res) => {
  //on enleve le cookie
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}