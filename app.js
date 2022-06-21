const express = require('express');
const bodyParser = require("body-parser");
const path=require('path')
const mongoose = require('mongoose');


const app= express();

const userRoutes=require('./routes/user')
const publicationRoutes=require('./routes/publication')

const session = require('express-session');



app.use(session({
    secret: 'my secret text',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});



mongoose.connect('mongodb+srv://walid:ronaldo75@cluster0.7vjlbbg.mongodb.net/groupomania',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

  app.use('/images',express.static(path.join(__dirname,'images')));

  app.use('/api',userRoutes);
  app.use('/api/publication',publicationRoutes)


module.exports= app;