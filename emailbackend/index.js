// require('dotenv').config();

const express = require('express');
const app = express();

const routes = require('./routes/routes')
const cors = require('cors')
const mongoose = require('mongoose');
const mongoUrl = require('./keys')



require("./module/module")
app.use(express.json());
app.use(cors());
app.use('/api' , routes);

mongoose.connect(mongoUrl,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
 

const db = mongoose.connection;
 
 
  
db.on('error', (error)=>{
    console.log(error);
})
  
db.once('connected', ()=>{
    console.log("DataBase Connected");
});


app.listen(3000,()=>{
    console.log(`DataBase started at Port no: 3000`);
});