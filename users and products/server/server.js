const express = require('express');
const app = express();
const _ = require('lodash');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const { User } = require('../models/user');
const { Order } = require('../models/order');

app.use(bodyParser());

app.get('/', (req, res) => {
    res.send('Hi from Home');
});

app.post('/users', (req, res) => {
    let user = _.pick(req.body, ['userName', 'email']);
    let newUser = new User(user);
    newUser.save().then((response) => {
        res.send(_.pick(user, ['userName', 'email']));
    }).catch((e) => {
        if (Object.keys(error).includes(e.code)) {
            res.status(400).send(error[e.code]);
        }
    });
});

app.get('/users', (req, res) => {
    User.find().then((response) => {
        let result = [];
        for (let i = 0; i < response.length; i++) {
            result.push(_.pick(response[i], ['userName', 'email']));
        }
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send('Invalid Id!');
    }
    User.findByIdAndDelete(id, (e, response) => {
        if (e) {
            return res.status(400).send(e);
        }
        if (response) {
            res.send(response);
        } else {
            res.status(404).send('Not Found!');
        }
    }).catch((e) => {
        res.status(500).send(e);
    });
});

app.patch('/users/:id', (req, res) => {
    let id = req.params.id;
    const newUser = _.pick(req.body, ['userName', 'email']);
    if (ObjectId.isValid(id)) {
        User.findByIdAndUpdate(id, { $set: newUser }, { new: true }).then((response) => {
            res.send(newUser);
        }).catch((e) => {
            res.status(400).send(e);
        });
    } else {
        res.status(400).send('Invalid Id!');
    }
});

app.post('/order', (req, res) => {
    const order = new Order(_.pick(req.body, ['name', 'price', 'quantity']));

    order.save().then((response) => {
        res.send(response);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete('/order/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid Id!');
    }
    Order.findByIdAndDelete(id, (err, response) => {
        if (err) {
            return res.status(400).send(response);
        } else if (!response) {
            return res.status(404).send('Not Found!');
        } else {
            res.send(`Product ${response.name} was successful removed!`);
        }
    }).catch((e) => {
        res.status(500).send(e);
    });
});

app.patch('/order/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    if (!ObjectId.isValid(orderId)) {
        return res.status(400).send('Invalid Id!');
    }
    const updatedOrder = _.pick(req.body, ['price', 'quantity']);
    Order.findByIdAndUpdate(orderId, { $set: updatedOrder }, { new: true }, (err, response) => {
        if (err) {
            res.status(400).send(err);
        } else if (!response) {
            res.status(404).send('Not Found!');
        } else {
            res.send(updatedOrder);
        }
    }).catch((e) => {
        res.status(500).send(e);
    });
});

// app.post('/makeOrder/:userId/:orderId', (req, res) => {
//     const userId = req.params.userId;
//     const orderId = req.params.orderId;

//     if (!ObjectId.isValid(userId)) {
//         res.status(400).send('Invalid user Id!');
//     } else if (!ObjectId.isValid(orderId)) {
//         res.status(400).send('Invalid order Id!');
//     } else {

//     }
// });

app.listen(3000);