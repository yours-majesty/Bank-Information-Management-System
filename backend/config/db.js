const mongoose = require('mongoose');

const connectDB = async(req,res)=>{
    
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
 
  }catch(error){
    console.log("Error conneting to the database",error);
    res.status(500).json({success:false,
        error:"Error connecting to the database",
    })
  }
}
module.exports=connectDB;