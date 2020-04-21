require('dotenv').config();

const jwt=require('jsonwebtoken');
//const users=require('../models/user')
const refreshTokenModel=require('../models/refreshTokens');
const validator=require('email-validator');
const login=require('../functions/login')



module.exports=function(authRoute){



    authRoute.post('/newToken', (request, response)=>{
        const refreshToken=request.headers['refresh-token'];
        if(refreshToken==null) return response.status(401).send();
        //console.log(refreshTokenModel.findOne({refreshToken: refreshToken}));
        refreshTokenModel.findOne({refreshToken: refreshToken}, (err, doc)=>{
            if(err){
                response.status(403).json({err});

            }else{  
                if(doc!=null){
                const accessToken=genAccessToken({email: doc.email});
                response.status(200).json({accessToken});
                }else{
                    response.status(403).json({message: 'newToken not found'})
                }
            }
        })


    });

    authRoute.delete('/logout', (request, response)=>{
        const refreshToken=request.headers['refresh-token'];
        if(refreshToken==null) return response.status(404).json({message: 'refresh token is null'});
        refreshTokenModel.deleteOne({refreshToken: refreshToken})
        .then(result=>{
            response.status(200).json({result});
        })
        .catch(err=>{
            response.status(400).json({err});

        });

    });

    authRoute.post('/login', (request, response)=>{
        
        const email=request.body.email;
        const password=request.body.password;
        validateUser(email, password).then(result=>{
            login.loginUser(email, password)
                .then(result=>{
                    const user={email:result.user.email}
                    const accessToken=genAccessToken(user);
                    const refreshToken=jwt.sign(user, process.env.SECRET_REFRESH_TOKEN)
                    const newToken=new refreshTokenModel({
                        email: email,
                        refreshToken: refreshToken

                    });

                    refreshTokenModel.create(newToken)
                    .then(result=>{
                        //console.log("Refresh token created: "+ result)
                        response.status(200).json({accessToken, refreshToken});
                        
                    })
                    .catch(err=>{
                        //console.log("New token creation error: "+ err);
                        response.status(403).json({err});
                    });


                                                           

                })
                .catch(err=>{response.status(400).json({message: err.message});});  //reject form loginUser
        })
        .catch(err=>{response.status(err.status).json({message: err.message})});    //reject from validateUser
        //console.log(password);
                
                
    });



































/**********************Functions***********************/

    function validateUser(email, password){
        
        return new Promise((resolve, reject)=>{

            if(!email || !password || !validator.validate(email.trim())){
                reject({status: 400, message: 'Invalid Entry'});
            }else{
                resolve({status:200, message: "valid Entries"})
            }

            

        });

    }


    function genAccessToken(user){
        return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {expiresIn:'120s'});
    }


}