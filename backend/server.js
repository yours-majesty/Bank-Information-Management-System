const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('My Api is working fine');
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on:${process.env.PORT}`);
});