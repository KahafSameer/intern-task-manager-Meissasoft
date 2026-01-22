const express = require('express');
const app = express();

app.get('/health', (req,res) =>{
    res.send('OK');
});
const port = 3000;
app.listen(port, ()=>{
console.log(`Health check is ok ${port}`);
});



