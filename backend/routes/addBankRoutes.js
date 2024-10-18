
const express = require('express');
const {addBankAccount,getBankAccount,updateBankAccount,deleteBankAccount} = require("../controllers/bankController");
const auth = require('../middlewares/auth')
const addBankRouter = express.Router();

addBankRouter.post('/add/BankAccount',auth,addBankAccount);
addBankRouter.get('/bank/get',auth,getBankAccount)
addBankRouter.put('/bank/:id', auth, updateBankAccount); // Update route
addBankRouter.delete('/bank/:id', auth, deleteBankAccount); // Delete route

module.exports=addBankRouter;