const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminRegister = async(req,res)=>{

   const {username , email , password}=req.body;

   try{
    const existingAdmin = await Admin.findOne({email});
    if(existingAdmin){
        console.log("Admin Already Exists");
        res.status(500).json({
            success:false,
            error:"Admin Already Exists"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const user = await Admin.create({
        
        username,
        email,
        password:hashPassword
    });

    return res.status(200).json({
        success:true,

        message:"Admin Registered Successfully"
    })
   }catch(error){
    console.log("Error creating the user",error);
    return res.status(500).json({
        success:false,
        error:"Something went wrong"
    })

   }
   
}

// for login admin
const loginAdmin = async(req,res)=>{
    const {email,password}=req.body;

    try{
        const admin = await Admin.findOne({email});
        if(!admin){
           return res.status(404).json({
            success:false,
            error:"Admin Does not Exists!!"

           })
        }

        const validPassword = await bcrypt.compare(password,admin.password);
        if(!validPassword){
            return res.status(500).json({
                success:false,
                error:"Invalid Credentails"
            })
        }

        const token = jwt.sign({email:email , adminId:admin._id},
            process.env.JWT_SECRET
            
        )
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV=='prodution'
        })

        return res.status(200).json({
            success:true,
            token,
            message:"Login Successful"
            
        })
    }catch(error){
        console.log("Some Error Occured",error);
        return res.status(500).json({
            sucess:false,
            error:"Internal Server Error"
        })
    }
}


const logOutAdmin = async(req,res)=>{
    res.clearCookie({
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict'
    })

    return res.status(200).json({
        sucess:true,
        message:"Logout Successful"
    })

}

module.exports={adminRegister,loginAdmin ,logOutAdmin};