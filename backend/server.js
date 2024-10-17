const express = require('express');
const connectDB=require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors =require('cors');

const app = express();


// connecting to the database
connectDB();

// for parsing form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


// using actual middlewares for setting up routes
app.use('/api',userRoutes);
app.use('/api/admin/',adminRoutes);



app.get('/',(req,res)=>{
    res.send('My Api is working fine');
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on:${process.env.PORT}`);
});