const router = require('express').Router();
const postController = require('../controllers/post.controller');

const middlMulter=require('../middleware/multer-post')


router.get('/', postController.readPost);
router.post('/',middlMulter, postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);




module.exports = router;