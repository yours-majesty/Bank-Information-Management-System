const express = require('express');
const {adminRegister,loginAdmin,logOutAdmin}=require('../controllers/adminController');
const adminRouter = express.Router();
const getAllBankAccounts = require('../controllers/getAllUserAccounts');
const adminAuth = require('../middlewares/adminAuth')


adminRouter.post('/register',adminRegister);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/logout',logOutAdmin);
adminRouter.get('/allusers',getAllBankAccounts);



module.exports=adminRouter;