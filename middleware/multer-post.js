const multer= require('multer')
const path=require('path')
const PostModel = require("../models/post.model");
// const { uploadErrors } = require("../utils/errors.utils");


const MIME_TYPES={
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'


}


const storage =multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,'publications')
    },
    filename:(req,file,cb)=>{

        const name=file.originalname.split(' ').join('_');;

        const extension=MIME_TYPES[file.mimetype];

        cb(null, name)
    }


})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype==="image/jpg" ){

        cb(null, true)
    } else {

        // throw Error("invalid file");
        cb(
            new Error("l'image n'est pas acceptée"),false)
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})

// module.exports=multer({storage:storage}).single('file');
module.exports=upload.single('file')