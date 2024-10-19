const BankAccount = require('../models/bankModel');


const addBankAccount = async(req,res)=>{

    const {IFSCCode,branchName,bankName,accountNumber,accountHolderName}=req.body;

    const userId = req.user._id;
    console.log("User ID:", req.user._id);

    try{
        const addedBankAccount =  await BankAccount.create({
            userId,
            IFSCCode,
            branchName,
            bankName,
            accountNumber,
            accountHolderName
        })
        

      return res.status(200).json({
        success:true,
        message:"Bank Account Successfully Added",
        account:addedBankAccount
      });
    }catch(error){
        return res.status(500).json({
            sucess:false,
            error:"Error adding bank Account"
        })
    }

}


const getBankAccount = async(req,res)=>{
    const userId = req.user._id;
    try{
        const bankAccounts = await BankAccount.find({ userId });
  

        res.status(200).json({
            bankAccounts
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            error:"Some error occured"
        })
    }
}
const updateBankAccount = async (req, res) => {
    const { id } = req.params; 
    const { IFSCCode, branchName, bankName, accountNumber, accountHolderName } = req.body;

    try {
        const updatedAccount = await BankAccount.findByIdAndUpdate(id, {
            IFSCCode,
            branchName,
            bankName,
            accountNumber,
            accountHolderName,
        }, { new: true }); 

        if (!updatedAccount) {
            return res.status(404).json({ success: false, message: "Bank account not found" });
        }

        res.status(200).json({
            success: true,
            message: "Bank Account Successfully Updated",
            account: updatedAccount
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error updating bank account"
        });
    }
};

const deleteBankAccount = async (req, res) => {
    const { id } = req.params; 
    try {
        const deletedAccount = await BankAccount.findByIdAndDelete(id);

        if (!deletedAccount) {
            return res.status(404).json({ success: false, message: "Bank account not found" });
        }

        res.status(200).json({
            success: true,
            message: "Bank Account Successfully Deleted"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error deleting bank account"
        });
    }
};


module.exports={addBankAccount,getBankAccount,updateBankAccount,deleteBankAccount};
