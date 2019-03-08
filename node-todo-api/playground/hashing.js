const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let password = 'abc123';
let hashPassword = '$2a$10$0MAYOL75niPKORTYvzcM2OMleKWg.7gDkia3jaEMMZA0dEuQTEVna';

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,result)=>{
       console.log(result);
    });
});

bcrypt.compare(password,hashPassword,(err,bool)=>{
    console.log(bool);
});