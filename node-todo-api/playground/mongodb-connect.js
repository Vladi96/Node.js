let { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server!')
    }
    console.log('Connected to MongoDB server!');

    let db = client.db('TodoApp');

    //Insert in DB

    // db.collection('Users').insertOne({
    //     name: 'Marto',
    //     age: 22,
    //     location: 'Sofia, Bulgaria',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Users!', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    //Print from DB
    // db.collection('Users').find({ name: 'Simo' }).toArray().then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    //Delete many
    // db.collection('Users').deleteMany({ name: 'Vladimir' }).then((result) => {
    //     console.log(result);
    // });

    //Delete One
    // db.collection('Users').deleteOne({ name: 'Simo' }).then((result) => {
    //     console.log(result);
    // });

    //FintOneAndDelete from DB
    // db.collection('Users').findOneAndDelete({ _id: new ObjectID('5c3a8c152c400132e49e98cc') }).then((result) => {
    //     console.log(result.value);
    // });

    //FindOneAndUpdate
    db.collection('Users').findOneAndUpdate({
        name: 'Vladimir'
    }, {
            $set: {
                name: 'Marto'
            },
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((res) => {
            console.log(res);
        });


    client.close();
});