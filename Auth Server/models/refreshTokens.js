'use strict';

const mongoose=require('mongoose');

const tokenSchema=new mongoose.Schema({

    email: String,
    refreshToken: String
});

tokenSchema.indexes({email: 1}, {unique: true});
mongoose.connect('mongodb://localhost:27017/node-auth', ({useNewUrlParser:true, useUnifiedTopology:true})).then(()=>{console.log('db connected refresh tokens')}).catch(()=>{console.log('Error connecting refreshTokens')});


module.exports=mongoose.model('refreshTokens', tokenSchema);