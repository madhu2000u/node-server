'use strict';

const user=require('../models/user')
const bcrypt=require('bcryptjs')

exports.loginUser=(email, password)=>{
     
    return new Promise((resolve, reject)=>{
        user.findOne({email: email})    //mongoose's model.findOne() returns a promise

        .then(users=>{
            //console.log('Inside login .then '+users);
            if(users==null){     //Which means there is no user found with the giver query.
                reject({status: 404, message: 'User not found!'});

            }else{
                //resolve({users: users, message:'User found'});
                return users;
            }

            
        })

        .then(user=>{
            if(user!=undefined){
                //console.log('Inside 2nd .then '+ user.hashed_password);
                

                if(bcrypt.compareSync(password, user.hashed_password)){
                    //console.log('Inside bcrypt if');
                    resolve({user: {name: user.name, email: user.email}, status: 200, message: "Valid credential"});
                }else{
                    reject({status: 401, message: 'Invalid Password Credential'});
            }
            }
        })

        .catch(err=>{
            //console.log('Inside login .catch '+err);
            reject({status: err.code, message: 'Internal Server Error'});
        });


    });
}