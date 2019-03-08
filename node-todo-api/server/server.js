const express = require('express');
const bodyParse = require('body-parser');
const _ = require('lodash');

const { ObjectID } = require('mongodb');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');

const app = express();

app.use(bodyParse());

app.post('/todos',authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator:req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.send(err);
    });
});

app.post('/users', (req, res) => {
    let user = _.pick(req.body, ['userName', 'email', 'password']);
    let newUser = new User(user);
    newUser.save().then(() => {
        return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/user/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.delete('/user/me/token', authenticate, (req,res)=>{
   req.user.removeToken(req.token).then(()=>{
        res.send('Logout!');
   }).catch((e)=>{
       res.send(e);
   });
});

app.get('/users', (req, res) => {
    User.find().then((result) => {
        res.send(result);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({_creator:req.user._id}).then((todos) => {
        res.send(todos);
    }, (e) => {
        res.status(400).send(e);
    });
});

// Todo.findById('5c3cb41a8c37782f14cf355b').then((res) => {
//     if (!res) {
//         return console.log('Unable to find this ID!');
//     }
//     console.log('Todo: -', res);
// }, (e) => {
//     console.log('Error:', e);
// });

app.delete('/todos/:id',authenticate, (req, res) => {
    let id = req.params.id;
    if (ObjectID.isValid(id)) {
        Todo.findOneAndDelete({
            _id:id,
            _creator:req.user._id
        }).then((response) => {
            if (response) {
                res.send(response);
            } else {
                res.status(404).send('Not Found!');
            }
        }).catch((err) => {
            res.status(500).send(err);
        });
    } else {
        res.status(400).send('Bad Request!');
    }
});

app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send('Bad Request!');
    } else {
        
        Todo.findOne({
            _id:id,
            _creator:req.user._id
        }).then((response) => {
            if (response) {
                res.send(response);
            } else {
                res.status(404).send('Not Found!');
            }
        }).catch((err) => {
            res.status(500).send(err);
        });
    }
});

app.patch('/users/:id', (req, res) => {
    let id = req.params.id;
    let newUserName = _.pick(req.body, ['userName', 'email']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Bad Request!');
    }

    User.findByIdAndUpdate(id, { $set: newUserName }, { new: true }).then((response) => {
        if (!response) {
            return res.status(404).send('Not Found!');
        }
        res.send(response);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'compleate']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Bad Request!');
    }

    if (_.isBoolean(body.compleate) && body.compleate) {
        body.compleateAt = new Date().getTime();
    }
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((response) => {
        if (!response) {
            return res.status(404).send('Not Found!');
        }
        res.send(response);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.post('/user/login',(req,res)=>{
   const {email, password} = _.pick(req.body,['email','password']);

   User.findByCredentials(email,password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
        res.header('x-auth',token).send(user);
    });
   }).catch((e)=>{
       res.status(400).send(e);
   });
});

app.listen(3000, () => {
    console.log('Started server on port 3 000.');
});