'use strict';

const user=require('../models/user');
const bcrypt=require('bcryptjs');

exports.registerUser=(name, email, password)=>{

    return new Promise((resolve, reject)=>{     //I had confusion whether to return the promise or not because, i though that when we call resolve or reject methods the promise will will be returned to corresponding caller with the .then or .catch callbacks but on testing it id didn't work. So we need to return the promise object and then use the .then and .catch callbacks from the calling function.

        const salt=bcrypt.genSaltSync();
        const hash=bcrypt.hashSync(password,salt);

        const newUser=new user({
            name:name,
            email:email,
            hashed_password: hash,
            date_created:new Date()
        });

        user.create(newUser).then(()=>{     //mongoose syntax: MyModel.create(docs)=> here user is the MyModel and newUser is the docs. The create() of mongoose returns a promise which can be handled based on if doc is inserted or not.
            //console.log("Success");
            resolve({status:201, message:"User Registered Successfully"});

        })

        .catch(err =>{
            //console.log('inside register '+err.code)
            if(err.code==11000){    //11000 error code is produced by mongodb when there is an already exting user with the same attribute, here it is email for example.
                reject({status:409, message: "User Already Exists!"});
            }else{
                reject({status: 500, message: "Server Error"});
            }
        });
        
        
    });

    
}
//module.exports=registerUser();
//exports.registerUser=registerUser;

//registerUser('Madhu','madhu@gmail', 'madhu');