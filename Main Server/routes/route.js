const jwt=require('jsonwebtoken');
const validator=require('email-validator');
const register=require('../functions/register');
//const login=require('../functions/login');
const dotenv=require('dotenv');
const users=require('../models/user');

dotenv.config();    


module.exports=function(route){

    route.post('/register', (request, response)=>{

        const email=request.body.email;
        const userName=request.body.name;
        const password=request.body.password;
        if (!email.trim() || !userName.trim() || !password.trim()) {
            response.status(400).json({message: 'Invalid Entries'})
            
        } else {
            //console.log("!email.trim()"+!email.trim());
            //validator.validate_async(email.trim(), (err, isValid) => {if(err){console.log(err);}else{emailValid=isValid;console.log('inside validator isValid: '+ isValid);}});
            //console.log('emailValid: '+ emailValid)
            if (validator.validate(email.trim())) {
                register.registerUser(userName, email, password)

                .then(result=>{response.status(result.status).json({message: result.message})})
                .catch(err=>{response.status(err.status).json({message: err.message})});
            
                
            } else {
                response.status(400).json({message: 'Invalid E-mail'});
                
            }

        
            
        }
        

        

        //console.log("In register "+ request.body.name);
        //response.status(200).send({name:request.body.name});

    });





    route.get('/profile',verifyToken, (request, response)=>{
        response.status(201).json({user:request.user});

    });

}

function verifyToken(request, response, next){
    accessToken=request.headers['access-token'];
    if(accessToken==null) return response.status(401);

    jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (err, user)=>{
        if(err) return response.status(403).json({error: err});

        request.user=user;
        next();

    });
}