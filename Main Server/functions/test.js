const register=require('./register');

const login=require('./login');

// register.registerUser('Kishore', 'kusal@gmail','kusala')


// .then(result=>{console.log('Inside test .then '+result.message)})
// .catch(error=>{console.log('Inside test .catch'+error.status)});

login.loginUser('kusal@gmail', 'kusala')

.then(result=>{console.log('Inside test .then '+ result.status+" "+ result.message)})
.catch(err=>{console.log('Inside test .catch '+err.status+err.message)})