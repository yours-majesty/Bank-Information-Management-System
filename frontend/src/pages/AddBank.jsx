import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import {useState} from "react";
import  styles from "../CSS/AddBank.module.css";

function AddBank() {

    const [IFSCCode,setIFCCode]=useState('');
    const [branchName,setBranchName]=useState('');
    const [bankName,setBankName]=useState('');
    const [accountNumber,setAccountNumber]=useState('');
    const [accountHolderName,setAccountHolderName]=useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        if(!token){
            toast.error("You are not Authorized");
        }

        try{
            const response = await axios.post(
                `${backendUrl}/api/add/BankAccount`,
                {
                    IFSCCode,
                    branchName,
                    bankName,
                    accountNumber,
                    accountHolderName
                },
                {
                    headers: {  
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (response.data.success) {
                toast.success("Bank Account Successfully Added");
            }
        }catch(error){
            console.log("Error:",error);
            toast.error("Error Adding Bank Account");
        }
    }

  return (
    <div>
        <div className={styles.bankContainer}>
            <div className={styles.addBankForm}>
                <h1>Add Your Bank Details</h1>
                <form onSubmit={handleSubmit}>

                <input type="text"
                    placeholder='Account Holder Name'
                    value={accountHolderName} 
                    onChange={(e)=>setAccountHolderName(e.target.value)}
                    required/>

                    <input type="text"
                    placeholder='IFSC Code' 
                    value={IFSCCode}
                    onChange={(e)=>setIFCCode(e.target.value)}
                    required/>

                    <input type="text"
                    placeholder='Enter Branch Name' 
                    value={branchName}
                    onChange={(e)=>setBranchName(e.target.value)}
                    required/>

                    <input type="text"
                    placeholder="Enter your Bank Name"
                    value={bankName}
                    onChange={(e)=>setBankName(e.target.value)}
                    required />

                    <input type="Number"
                    placeholder='Bank Account Number'
                    value={accountNumber} 
                    onChange={(e)=>setAccountNumber(e.target.value)}
                    required/>

                    <button type='submit' >Add Account</button>
                </form>
                <ToastContainer/>
            </div>
        </div>
      
    </div>
  )
}

export default AddBank
