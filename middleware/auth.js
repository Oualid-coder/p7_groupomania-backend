const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
// authentification pour chaque requete afin de verifier si le userid correspond au userid qui a envoyé la requete indispensable pour sécurisé nos requetes 
    try{
const token=req.headers.authorization.split(' ')[1];
const decodedToken=jwt.verify(token, 'RANDOM_TOKEN_SECRET')
const userId=decodedToken.userId

req.auth={userId:userId}
if (req.body.userId && req.body.userId !== userId){
    throw 'invalid user ID'
}else{
    next()
}

    }catch{ res.status(401).json({error: new Error('invalid request ! ')})}
}