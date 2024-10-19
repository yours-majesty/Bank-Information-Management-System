
const BankAccount = require('../models/bankModel')
const getAllBankAccounts = async (req, res) => {
    try {
        const bankAccounts = await BankAccount.find();
        res.status(200).json({ bankAccounts });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Some error occurred"
        });
    }
};

module.exports = getAllBankAccounts ;
