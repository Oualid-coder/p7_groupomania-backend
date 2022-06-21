const fs=require('fs')
const Publication=require('../models/Publication')




exports.createPublication=(req,res,next)=>{

    const publicationObject=JSON.parse(req.body.publication)
    
    // delete sauceObject._id
    const publication= new Publication({

        ...publicationObject,
        // userId:req.body.userId,
        // contenuPost:req.body.contenuPost,
        
        // date:new Date(),
        // likes:req.body.likes,
        // usersLiked:req.body.usersLiked,
        
        
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        

    })

    

    publication.save()
    .then(()=>res.status(201).json({message:'publication crée avec succés !'})).catch(error=>res.status(400).json({error}))

}



exports.putPublication=(req,res,next)=>{
    const publicationObject=req.file ?
    {...JSON.parse(req.body.publication),
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`}:{...req.body}

    Publication.updateOne({_id:req.params.id},{...publicationObject,_id:req.params.id})
    .then(()=>res.status(200).json({message:'Post modifié !'}))
    .catch(error => res.status(400).json({error}))


}


exports.deletePublication=(req,res,next)=>{

    Publication.findOne({_id:req.params.id}).then(

        publication=>{
            //on extrait le nom du fichier a supprimé le split nous retourne 2 éléments avant images et après on choisi le second élément 
            const filename=publication.imageUrl.split('/images/')[1];//suppréssion avec fs.unlink
            fs.unlink(`images/${filename}`,()=>{
                Publication.deleteOne({_id:req.params.id}).then(() => res.status(200).json({ message: 'Post supprimé !'})).catch(error => res.status(400).json({ error }))
            })
        }
    ).catch(error=>res.status(500).json({error}))



}





exports.getAllpublications=(req,res,next)=>{

    Publication.find().sort({date:-1}).then(publications=>res.status(200).json(publications)).catch(error=>res.status(400).json({error}))




}


exports.like=(req,res,next)=>{}

