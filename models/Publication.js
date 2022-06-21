const mongoose=require('mongoose')

const publicationSchema=mongoose.Schema({
    
    userId: {type: String, required: true},
    
    contenuPost: {type: String, required: true},
    
    imageUrl: {type: String, required: false},
    
    likes: {type: Number, required: false, default:0},

    date :{type:Date , default:Date.now },
    
    usersLiked: {type: [String], required: false},
    
    



})

module.exports=mongoose.model('Publication',publicationSchema)