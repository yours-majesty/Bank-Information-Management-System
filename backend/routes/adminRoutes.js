const express = require('express');
const {adminRegister,loginAdmin,logOutAdmin}=require('../controllers/adminController');
const adminRouter = express.Router();


adminRouter.post('/register',adminRegister);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/logout',logOutAdmin);


module.exports=adminRouter;