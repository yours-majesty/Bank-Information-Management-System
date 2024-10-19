const express = require('express');
const connectDB=require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors =require('cors');
const addBankRoutes = require('./routes/addBankRoutes')
const app = express();


// connecting to the database
connectDB();

// for parsing form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const allowedOrigins = ["https://bank-information-management-system-application.vercel.app","https://bank-information-management-system-admin.vercel.app"]; 
app.use(
    cors({
        origin: function (origin, callback) {
            if (
                !origin || 
                allowedOrigins.includes(origin)  
            ) {
                callback(null, true); 
            } else {
                callback(new Error("Not allowed by CORS")); 
            }
        },
        credentials: true, 
        optionsSuccessStatus: 200 
    })
);


// using actual middlewares for setting up routes
app.use('/api',userRoutes);
app.use('/api/admin/',adminRoutes);
app.use('/api',addBankRoutes);



app.get('/',(req,res)=>{
    res.send('My Api is working fine');
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on:${process.env.PORT}`);
});
