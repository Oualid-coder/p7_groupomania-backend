
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;




module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async(req, res) => {

  let fileName;

if(req.file !== null){

  fileName=req.body.posterId + '.jpg'
}


    const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file  ? `${req.protocol}://${req.get('host')}/publications/${req.file.filename}` : "",
    
    likers: [],
    
  });

    try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }

 


 
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.likePost = async (req, res) => {
  // on controle si l'id est correct
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {

    await PostModel.findByIdAndUpdate(
      //on recupere l'id en params
      req.params.id,
      {
        // on rajoute une donnée en plus au tableau on transmet l'id de la personne qui a liker
        $addToSet: { likers: req.body.id },
      },
      { new: true },
     (err,docs)=>{
       if(err) return res.status(400).send(err)
     }
     );

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        // onjoute l'id du post dans le array likes du user
        $addToSet: { likes: req.params.id },
      },
      { new: true },
            (err,docs)=>{
              if(!err) res.send(docs);
              else return res.status(400).send(err)
            })
    } catch (err) {
        return res.status(400).send(err);
    }
    
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
            (err,docs)=>{
              if(err) return res.status(400).send(err)
            }
            );

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
            (err,docs)=>{
              if(!err) res.send(docs);
              else return res.status(400).send(err)
            })
    } catch (err) {
        return res.status(400).send(err);
    }
};





