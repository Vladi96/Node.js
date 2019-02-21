const { mongoose } = require('../server/mongoose');

let userShema = ({
    userName: {
        minlenght: 3,
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        minlenght: 4,
        required: true,
        trim: true,
        unique: true
    },
    orders: []
});

let User = mongoose.model('User', userShema);

module.exports = { User }