let { mongoose } = require('../server/mongoos');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    compleate: {
        type: Boolean,
        default: false
    },
    compleateAt: {},
    _creator:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    }
});

module.exports = { Todo };