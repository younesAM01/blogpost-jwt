const express = require('express')
const postRouter  = express.Router()
const auth = require('../middlewares/middleware');

const {deletePost,getPost,updatpost, creatpost} = require('../controllers/postController')

postRouter.get('/',auth, getPost)
postRouter.post('/post',auth,creatpost)
postRouter.put('/:title',auth,updatpost)
postRouter.delete('/:title',auth, deletePost)





module.exports= postRouter;
