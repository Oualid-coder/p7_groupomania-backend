const express =require('express');
const router=express.Router()


const pubCtrl=require('../controllers/publication')
const auth=require('../middleware/auth')
const multer=require('../middleware/multer-config')
const admin=require('../middleware/admin')



router.put('/:id', auth,multer,pubCtrl.putPublication)
router.delete('/:id' ,auth ,pubCtrl.deletePublication)

router.post('/', auth,multer,pubCtrl.createPublication)
router.get('/' ,auth, pubCtrl.getAllpublications)


module.exports = router;