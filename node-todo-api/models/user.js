const { mongoose } = require('../server/mongoos');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        minlength: 2,
        trim: true,
        require: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email!'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens:[{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

userSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';

    let token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
    
    user.tokens.push({ access:access,token:token });

    return user.save().then(() => {
        return token;
    });
};

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email', 'userName']);
};

userSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (error) {
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

userSchema.pre('save',function(next){
    const user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(!err){
                    user.password = hash;
                    next();
                }
            });
        });
    }else{
        next();
    }
});

userSchema.statics.findByCredentials = function(email,password){
    let user = this;

   return user.findOne({email}).then((res)=>{
        if(!res){
            return Promise.reject();
        }
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,res.password,(err,bool)=>{
                if(bool){
                     resolve(res);
                }
                else{
                    reject('Wrong password!');
                }
            });
        });
    });
}

userSchema.methods.removeToken= function(token){
    let user = this;

    return user.update({
        $pull:{
            tokens:{token}
        }    
    });
}


let User = mongoose.model('User', userSchema);

module.exports = { User };