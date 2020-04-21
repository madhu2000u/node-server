const express=require('express');
const app=express();
let port=3000;

const route=express.Router();

app.use(express.json());

require('./routes/authRoute')(route);

app.use('/api', route);
if(process.env.PORT!=undefined){port=process.env.PORT}


app.listen(port);