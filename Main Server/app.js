//'use strict';

const express=require('express');
//const bodyparser=require('body-parser');
const app=express();
let port=4000;

const route=express.Router();

//app.use(bodyparser.json());
app.use(express.json());




require('./routes/route')(route);
app.use('/api', route);

if(process.env.PORT!=undefined){port=process.env.PORT}

app.listen(port);