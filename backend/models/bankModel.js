const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    IFSCCode: {
        type: String,
        required: true,
    },
    branchName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accountHolderName: {
        type: String,
        required: true
    }
});

// Correct export statement
module.exports = mongoose.model('BankAccount', bankSchema);
