'use strict';

const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    name: String,
    email: String,
    hashed_password: String,
    date_created: {type: Date, default: Date.now}

});

mongoose.connect('mongodb://localhost:27017/node-auth', ({useNewUrlParser: true, useUnifiedTopology:true})).then(()=>{console.log('db connected')}).catch(()=>{console.log('Error connecting')});

module.exports=mongoose.model('user', userSchema, 'users');
