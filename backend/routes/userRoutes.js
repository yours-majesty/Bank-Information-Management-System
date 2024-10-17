const express = require('express');
const {loginUser,logOutUser,register} = require('../controllers/userController')
const userRouter = express.Router();


userRouter.post('/register',register);
userRouter.post('/login',loginUser);
userRouter.post('/logout',logOutUser);


module.exports=userRouter;


