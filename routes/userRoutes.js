const express = require('express')
const userRouter  = express.Router()
const {login,register} = require('../controllers/userController')
const auth = require('../middlewares/middleware');


userRouter.post('/register',register)
userRouter.post("/login",login)


module.exports= userRouter;
